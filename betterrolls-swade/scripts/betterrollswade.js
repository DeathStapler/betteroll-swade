class CustomRoll {
	/**
	 * The base function fot custom roll.s
	 */
	constructor(item) {
		this.actor = item.actor;
		this.item = item
	}

	get_skill(){
		/* Returns the ability used for this item */
		let ability = "Fighting"  // Default
		if (parseInt(this.item.data.data.range) > 0) {
			// noinspection JSUnresolvedVariable
			if (this.item.data.data.damage.includes('str')) {
				ability = "Athletics"
			} else {
				ability = "Shooting"
			}
		}
		return ability
	}

	add_modifiers(roll_string, modifier){
		// Add a modifier to a roll string
		if (modifier > 0) {
			roll_string = roll_string + "+" + modifier;
		} else if (modifier <0) {
			roll_string = roll_string + "-" + Math.abs(modifier);
		}
		return roll_string;
	}

	async toMessage(){
		// Attack roll
		let parts = [];
		let skill = this.get_skill();
		let die = "4"
		let skill_modifier = "-2"
		let wild_die = "6"
		let rof = this.item.data.data.rof
		let currentRoll
		let roll_string = ''
		let attack_array = []
		if (isNaN(rof) || rof < 1) {
			rof = 1
		}
		this.item.options.actor.data.items.forEach((item) => {
			if (item.name === skill) {
				die = item.data.die.sides;
				skill_modifier = parseInt(item.data.die.modifier);
				wild_die = item.data['wild-die'].sides;
			}
		})
		for (let i=0; i < rof; i++) {attack_array.push(`1d${die}x=`)}
		if (this.item.options.actor.data.data.wildcard) {
			attack_array.push(`1d${wild_die}x=`);
		}
		let attack_rolls = [];
		let minimum_roll = 999999;
		let discarded_index = 999999;
		let nice_string = ""
		let nice_results = []
		attack_array.forEach((dice_string, index) => {
			roll_string = dice_string
			roll_string = this.add_modifiers(roll_string, skill_modifier)
			// Wounds and fatigue
			roll_string = this.add_modifiers(
				roll_string, this.item.options.actor.calcWoundFatigePenalties())
			roll_string = this.add_modifiers(
				roll_string, this.item.options.actor.calcStatusPenalties())
			currentRoll = new Roll(roll_string);
			currentRoll.roll()
			currentRoll.dice.forEach((dice) => {
				dice.rolls.forEach((roll) => {
					nice_string = nice_string + `d${dice.faces}+`;
					nice_results.push(roll.roll);
				})
			})
			// Dice so nice, roll all attack dice together
			attack_rolls.push(currentRoll)
			if (currentRoll.total < minimum_roll) {
				minimum_roll = currentRoll.total
				discarded_index = index
			}
		})
		if (game.dice3d) {
			// noinspection ES6MissingAwait
			game.dice3d.show({formula: nice_string.slice(0, -1),
								 results: nice_results})
		}
		let array_show = attack_rolls.slice()
		array_show.splice(discarded_index, 1)
		let attack_roll = {roll_title: 'Attack', rolls: attack_rolls,
			rolls_accepted: array_show};
		parts.push(attack_roll);
		// Damage roll
		let damage_rolls = []
		for (let i = 0; i < rof; i++){
			let damage = new Roll(this.item.data.data.damage,
								  this.item.actor.getRollShortcuts());
			damage.roll();
			if (game.dice3d) {
				// noinspection ES6MissingAwait
				game.dice3d.showForRoll(damage)
			}
			damage_rolls.push(damage)
		}
		let damage_roll = {roll_title: 'Damage', rolls: damage_rolls,
			rolls_accepted: damage_rolls};
		parts.push(damage_roll);
		// Raise damage
		let raise_damage_rolls = []
		damage_rolls.forEach((damage) => {
			let raise_damage_roll = new Roll(`${damage.total}+1d6x=`);
			raise_damage_roll.roll()
			if (game.dice3d) {
				game.dice3d.showForRoll(raise_damage_roll)
			}
			raise_damage_rolls.push(raise_damage_roll)
		})
		let raise_damage = {roll_title: 'Raise damage',
							rolls: raise_damage_rolls,
							rolls_accepted: raise_damage_rolls};
		parts.push(raise_damage);
		let content = await renderTemplate(
			"modules/betterrolls-swade/templates/fullroll.html", {
				parts: parts, title: this.item.name,
				description: this.item.data.data.description
			});
		let chatData = {
			user: game.user._id,
			content: content,
			speaker: {
				actor: this.actor._idx,
				token: this.actor.token,
				alias: this.actor.name
			},
			type: CONST.CHAT_MESSAGE_TYPES.ROLL,
			roll: new Roll("").roll()
		}
		/* TODO whisper settings */
		await ChatMessage.create(chatData);
	}
}

function changeRolls (actor, html) {
	/* Replaces the button in the weapons to make a new roll */
	if (actor && actor.permission < 3) { return; }
	// Assign new action to item image button
	let itemImage = html.find('.item-image');
	if (itemImage.length > 0) {
		itemImage.off();
		itemImage.click(async event => {
				event.preventDefault();
				event.stopPropagation();
				let li = $(event.currentTarget).parents(".item");
				let item = actor.getOwnedItem(String(li.attr("data-item-id")));
				let roll = new CustomRoll(item)
				if (item.type === "weapon"){
					await roll.toMessage()
				}
		});
	}
}

export class BetterRollsHooks {

	static addActorSheet(sheetName) {
		let sheetString = "render" + sheetName;
		Hooks.on(sheetString, (app, html, data) => {
			changeRolls(app.object, html, data);
		});
	}
}

// TODO: Make this work with NPC sheets
BetterRollsHooks.addActorSheet("SwadeCharacterSheet");

Hooks.on(`ready`, () => {
	console.log('Better Rolls for SWADE | Ready');
})
