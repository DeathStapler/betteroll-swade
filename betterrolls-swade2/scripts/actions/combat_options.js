/// Actions for combat options in the core rulebook

export const COMBAT_OPTIONS = [
        {id: "WTK", name: "Wild Attack", button_name: "BRSW.WildAttack",
                skillMod: 2, dmgMod: 2, dmgOverride: "",
                selector_type: "skill", selector_value: "fighting",
                self_add_status: "vulnerable", group: "BRSW.AttackOption"},
        {id: "DROP", name:"The Drop", button_name: "BRSW.TheDrop", skillMod: 4,
                dmgMod: 4, dmgOverride: "", selector_type: "item_type",
                selector_value: "weapon", group: "BRSW.SituationalModifiers"},
        {id: "CS-HEAD", name:"Called Shot: Head", button_name: "BRSW.CalledHead", skillMod: -4,
                dmgMod: +4, dmgOverride: "", selector_type: "item_type",
                selector_value: "weapon", group: "BRSW.AttackOption", change_location: "head"},
        {id: "CS-ARM", name:"Called Shot: Arm", button_name: "BRSW.CalledArm", skillMod: -2,
                selector_type: "item_type", selector_value: "weapon", group: "BRSW.AttackOption",
                change_location: "arm"},
        {id: "CS-LEG", name:"Called Shot: Leg", button_name: "BRSW.CalledLeg", skillMod: -2,
                selector_type: "item_type", selector_value: "weapon", group: "BRSW.AttackOption",
                change_location: "leg"},

  {
    id: "1-LightCover",
    name: "Light Cover",
    button_name: "Light",
    skillMod: "-2",
    or_selector: [{
        selector_type: "item_type",
        selector_value: "power"
      },
      {
        selector_type: "item_type",
        selector_value: "weapon"
      }
    ],    
    group: "BRSW.Cover"
  }, {
    id: "2-MediumCover",
    name: "Medium Cover",
    button_name: "Medium",
    skillMod: "-4",
    or_selector: [{
        selector_type: "item_type",
        selector_value: "power"
      },
      {
        selector_type: "item_type",
        selector_value: "weapon"
      }
    ], 
    group: "BRSW.Cover"
  }, {
    id: "3-HeavyCover",
    name: "Heavy Cover",
    button_name: "Heavy",
    skillMod: "-6",
    or_selector: [{
        selector_type: "item_type",
        selector_value: "power"
      },
      {
        selector_type: "item_type",
        selector_value: "weapon"
      }
    ], 
    group: "BRSW.Cover"
  }, {
    id: "4-NearTotalCover",
    name: "Near Total Cover",
    button_name: "NearTotal",
    skillMod: "-8",
    or_selector: [{
        selector_type: "item_type",
        selector_value: "power"
      },
      {
        selector_type: "item_type",
        selector_value: "weapon"
      }
    ], 
    group: "BRSW.Cover"
  },
        
        {id: "1LDimGm", name: "Dim", button_name: "BRSW.IlluminationDim", skillMod: "-2", selector_type: "gm_action", group: "BRSW.IlluminationGM"},
        {id: "2LDarkGm", name: "Dark", button_name: "BRSW.IlluminationDark", skillMod: "-4", selector_type: "gm_action", group: "BRSW.IlluminationGM"},
        {id: "3LPitchGm", name: "Pitch Dark", button_name: "BRSW.IlluminationPitch", skillMod: "-6",
                selector_type: "gm_action", group: "BRSW.IlluminationGM"},
        {id: "1LDim", name: "Dim", button_name: "BRSW.IlluminationDim", selector_type: "all", skillMod: "-2", group: "BRSW.Illumination"},
        {id: "2LDark", name: "Dark", button_name: "BRSW.IlluminationDark", selector_type: "all", skillMod: "-4", group: "BRSW.Illumination"},
        {id: "3LPitch", name: "Pitch Dark", button_name: "BRSW.IlluminationPitch", selector_type: "all",
                skillMod: "-6", group: "BRSW.Illumination"},
        {id: "UNSTABLEPLATFORM", name: "Unstable Platform", button_name: "BRSW.UnstablePlatform", "skillMod": "-2", and_selector:[{
                or_selector:[{"selector_type":"skill","selector_value":"Shooting"}, {"selector_type":"skill","selector_value":"Athletics"}]},
                        {not_selector:[{selector_type:"actor_has_edge", selector_value:"BRSW.EdgeName-Steady-Hands"}]}],
                group: "BRSW.SituationalModifiers"},
        {id: "TOUCHATTACK", name: "Touch Attack", button_name: "BRSW.TouchAttack", skillMod: "+2", dmgOverride: "0",
                selector_type: "skill", selector_value: "fighting", group: "BRSW.SituationalModifiers"},
        {id: "NONLETHALDAMAGE", name: "Nonlethal Damage", button_name: "BRSW.NonlethalDamage", skillMod: "-1",
                selector_type: "skill", selector_value: "fighting", group: "BRSW.SituationalModifiers"},
        {id:"RAN", name:"Ran", button_name:"BRSW.Ran", skillMod:"-2",
                not_selector:[{selector_type:"actor_has_edge", selector_value:"BRSW.EdgeName-Steady-Hands"}],
                group:"BRSW.Multi-action"},
        {id:"2ACTIONS", name:"2 actions",button_name:"BRSW.Two-actions", skillMod:"-2",selector_type:"all",
                group:"BRSW.Multi-action"},
        {id:"3ACTIONS", name:"3 actions",button_name:"BRSW.Three-actions", skillMod:"-4",selector_type:"all",
                group:"BRSW.Multi-action"},
        {id: "GROUP_ROLL", name:"Group roll", button_name: "BRSW.GroupRoll", add_wild_die: "true",
                selector_type: "is_wildcard", selector_value: "false", group: "BRSW.SituationalModifiers"},
        {id: "AttackInanimateObject ", name: "Attack Inanimate Object", button_name: "BRSW.AttackInanimate",
                avoid_exploding_damage: "true", or_selector:[{selector_type:"item_type", selector_value:"power"},
                        {selector_type: "item_type", selector_value:"weapon"}],
                group: "BRSW.AttackOption"},
        {id: "AP1", name:"AP1", button_name: "BRSW.AP1", apMod: 1,
        and_selector:[{selector_type: "item_has_damage"},
                {selector_type:"item_type", selector_value:"power"}],
                group: "SWADE.APLong"},
        {id: "AP2", name:"AP2", button_name: "BRSW.AP2", apMod: 2,
        and_selector:[{selector_type: "item_has_damage"},
                {selector_type:"item_type", selector_value:"power"}],
                group: "SWADE.APLong"},
        {id: "AP3", name:"AP3", button_name: "BRSW.AP3", apMod: 3,
        and_selector:[{selector_type: "item_has_damage"},
                {selector_type:"item_type", selector_value:"power"}],
                group: "SWADE.APLong"}
]
