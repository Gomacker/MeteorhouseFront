<script setup>
import UnitPicInfo from "@/components/party/components/UnitPicInfo.vue";
import {unit_data} from "@/components/party_manager";

const up_data_fire = [
  {
    id: 3,
    content: {
      '技能': [
        '技能能量：650',
        '技能能量：<hl class="only-highlight">550</hl>',
      ],
      '队长': [
        '火属性角色攻击力 + 40%\n强化弹射伤害 + 40%',
        '火属性角色攻击力 + <hl>100%</hl>\n强化弹射伤害 + <hl>70%</hl>',
      ],
      '能力2': [
        '5 次Power Flip（强化弹射）时，自身攻击力 + 10%[最大 + 60%]',
        '5 次Power Flip（强化弹射）时，自身攻击力 + <hl>15%</hl>[最大 + <hl>90%</hl>]',
      ]
    }
  },
  {
    id: 4,
    content: {
      '技能': [
        '召唤出的协力球基本HP：673',
        '召唤出的协力球基本HP：<hl>840</hl>',
      ],
      '队长': [
        '火属性角色生命值 + 15% & 攻击力 + 30%\n20 次弹射时，火属性角色攻击力 + 5%[最大 + 25%]',
        '火属性角色生命值 + <hl>20%</hl> & 攻击力 + <hl>50%</hl>\n20 次弹射时，火属性角色攻击力 + <hl>12.5</hl>%[最大 + <hl>50%</hl>]',
      ],
      '能力1': [
        '自身攻击力 + 30%',
        '自身攻击力 + <hl>55%</hl>',
      ]
    }
  },
  {
    id: 5,
    content: {
      '队长': [
        '火属性角色技能伤害 + 125%',
        '火属性角色技能伤害 + <hl>200%</hl>',
      ]
    }
  },
  {
    id: 119,
    content: {
      '技能': [
        '-',
        '<hl>技能的停止时间缩短</hl>',
      ],
      '队长': [
        '火属性角色攻击力 + 30% & 强化效果时间 + 25%',
        '火属性角色攻击力 + <hl>50%</hl> & 强化效果时间 + 25%',
      ]
    }
  },
  {
    id: 133,
    content: {
      '队长': [
        '火属性角色攻击力 + 30%\n协力球攻击力 + 40% & 生命值 + 10%',
        '火属性角色攻击力 + <hl>80%</hl>\n协力球攻击力 + 40% & 生命值 + 10%',
      ]
    }
  },
  {
    id: 143,
    content: {
      '队长': [
        '火属性角色攻击力 + 30%\n强化弹射伤害 + 65%',
        '火属性角色攻击力 + <hl>60%</hl>\n强化弹射伤害 + <hl>100%</hl>',
      ]
    }
  },
  {
    id: 208,
    content: {
      '队长': [
        '火属性角色生命值 + 20% & 技能伤害 + 40%',
        '火属性角色生命值 + 20% & 技能伤害 + <hl>60%</hl>',
      ],
      '能力2': [
        '每当火属性角色承受 5 次伤害时，该角色技能伤害 + 5%[最大 + 25%]\n火属性角色生命值 + 5%',
        '每当火属性角色承受 5 次伤害时，该角色技能伤害 + <hl>6%</hl>[最大 + <hl>30%</hl>]\n火属性角色生命值 + 5%',
      ],
      '能力3': [
        '作为主要角色编成：每当火属性角色承受 5 次伤害时，该角色技能伤害 + 6%[最大 + 30%]\n作为主要角色编成：10 次冲刺时，火属性角色攻击力 + 6%[最大 + 30%]',
        '作为主要角色编成：每当火属性角色承受 5 次伤害时，该角色技能伤害 + 6%[最大 + <hl>36%</hl>]\n作为主要角色编成：10 次冲刺时，火属性角色攻击力 + 6%[最大 + <hl>36%</hl>]',
      ],
      '能力4': [
        '战斗开始时，自身技能槽 + 35%',
        '战斗开始时，自身技能槽 + 35% & <hl>棺柩计数 - 2</hl>',
      ]
    }
  },
  {
    id: 238,
    content: {
      '队长': [
        '队伍中编入 3 名以上种族为“龙”角色时，队伍全体攻击力 + 90%',
        '队伍中编入 3 名以上种族为“龙”角色时，队伍全体攻击力 + <hl>180%</hl>',
      ]
    }
  },
  {
    id: 252,
    content: {
      '技能': [
        '挥舞斧枪叩击地面，对自身正面的敌人造成火属性伤害(16x / 1hit) / 以叩击造成的冲击振动大地，对周围的敌人造成火属性伤害(5x / 3hit) / 赋予全体队员攻击力提升(75% / 15s)效果',
        '挥舞斧枪叩击地面，对自身正面的敌人造成火属性伤害(16x / 1hit) / 以叩击造成的冲击振动大地，对周围的敌人造成火属性伤害(<hl>12x</hl> / <hl>5hit</hl>) / 赋予全体队员攻击力提升(75% / 15s)效果',
      ],
      '队长': [
        '火属性角色攻击力 + 40%\n每当自身承受 15 次伤害时，火属性角色攻击力 + 8%[最大 + 80%]',
        '火属性角色攻击力 + <hl>60%</hl>\n每当自身承受 15 次伤害时，火属性角色攻击力 + <hl>14%</hl>[最大 + <hl>140%</hl>]',
      ],
      '能力1': [
        '自身攻击力 + 20%\n每当自身承受 10 次伤害时，自身攻击力 + 5%[最大 + 60%]',
        '自身攻击力 + <hl>30%</hl>\n每当自身承受 10 次伤害时，自身攻击力 + <hl>7%</hl>[最大 + <hl>70%</hl>]',
      ],
      '能力2': [
        '自身风属性耐性 + 25%',
        '自身风属性耐性 + <hl>30%</hl>',
      ],
      '能力3': [
        '作为主要角色编成：自身攻击力 + 60% & 风属性抗性 + 30% & 自身代替除自身外的角色承受 50% 伤害',
        '作为主要角色编成：自身攻击力 + <hl>80%</hl> & 风属性抗性 + 30% & 自身代替除自身外的角色承受 50% 伤害',
      ]
    }
  },
  {
    id: 258,
    content: {
      '技能': [
        '技能能量：600',
        '技能能量：<hl>570</hl>',
      ],
      '队长': [
        '火属性角色生命值 + 15% & 攻击力 + 40%',
        '火属性角色生命值 + <hl>20%</hl> & 攻击力 + <hl>80%</hl>',
      ],
      '能力1': [
        '火属性角色生命值 + 10%',
        '火属性角色生命值 + <hl>15%</hl>',
      ],
      '能力3': [
        '作为主要角色编成：自身发动技能时，火属性角色攻击力 + 12.5%[最大 + 50%] & 所受的回复量 + 5%[最大 + 20%]',
        '作为主要角色编成：自身发动技能时，火属性角色攻击力 + <hl>17.5%</hl>[最大 + <hl>70%</hl>] & 所受的回复量 + 5%[最大 + 20%]',
      ]
    }
  },
  {
    id: 266,
    content: {
      '队长': [
        '战斗开始时，火属性角色技能槽 + 50% & 协力球生命值 + 10%\n火属性角色发动技能时，协力球攻击力 + 5%[最大 + 50%]',
        '战斗开始时，火属性角色技能槽 + 50% & 协力球生命值 + 10%\n火属性角色发动技能时，协力球攻击力 + <hl>10%</hl>[最大 + <hl>100%</hl>]',
      ]
    }
  },
  {
    id: 1,
    content: {
      '队长': [
        '编入队伍中的角色属性每增加 1 种时，队伍全体攻击力 + 8%[最大 + 48%]',
        '编入队伍中的角色属性每增加 1 种时，队伍全体攻击力 + <hl>25%</hl>[最大 + <hl>150%</hl>]',
      ],
      '能力1': [
        '队伍全体攻击力 + 10%',
        '队伍全体攻击力 + <hl>20%</hl>',
      ],
      '能力3': [
        '作为主要角色编成：自身发动技能时，自身攻击力 + 30%[最大 + 120%]',
        '作为主要角色编成：自身发动技能时，自身攻击力 + <hl>45%</hl>[最大 + <hl>180%</hl>]',
      ],
    }
  },
  {
    id: 19,
    content: {
      '队长': [
        '火属性角色攻击力 + 30% & 对种族为“龙”的敌人造成的伤害 + 25%（独立伤害乘区1）',
        '火属性角色攻击力 + <hl>40%</hl> & 对种族为“龙”的敌人造成的伤害 + 25%（独立伤害乘区1）',
      ],
      '能力1': [
        '自身攻击力 + 25%',
        '自身攻击力 + <hl>45%</hl>',
      ],
    }
  },
  {
    id: 20,
    content: {
      '队长': [
        '队伍中编入 2 名以上种族为“龙”角色时，队伍全体攻击力 + 65%',
        '队伍中编入 2 名以上种族为“龙”角色时，队伍全体攻击力 + <hl>120%</hl>',
      ],
      '能力3': [
        '种族为“龙”角色攻击力 + 40%',
        '种族为“龙”角色攻击力 + <hl>80%</hl>',
      ]
    }
  },
  {
    id: 21,
    content: {
      '能力1': [
        '每当达成 30 COMBO（连击）时，自身攻击力 + 8%[最大 + 40%]',
        '每当达成 30 COMBO（连击）时，自身攻击力 + <hl>12%</hl>[最大 + <hl>60%</hl>]',
      ]
    }
  },
  {
    id: 22,
    content: {
      '技能': [
        '技能能量：650',
        '技能能量：<hl>550</hl>',
      ],
      '队长': [
        '火属性角色攻击力 + 50%',
        '火属性角色攻击力 + <hl>120%</hl>',
      ],
      '能力1': [
        '自身攻击力 + 25%',
        '自身攻击力 + <hl>45%</hl>',
      ],
      '能力2': [
        '每击败 5 个敌人，自身攻击力 + 6%[最大 + 60%]',
        '每击败 5 个敌人，自身攻击力 + <hl>10%</hl>[最大 + 60%]',
      ],
      '能力3': [
        '作为主要角色编成：强化弹射Lv3所需要的连击数量 - 3 & 自身攻击力 + 40%',
        '作为主要角色编成：强化弹射Lv3所需要的连击数量 - 3 & 自身攻击力 + <hl>70%</hl>',
      ]
    }
  },
  {
    id: 23,
    content: {
      '技能': [
        '技能能量：560',
        '技能能量：<hl>530</hl>',
      ],
      '队长': [
        '强化弹射伤害 + 100%',
        '强化弹射伤害 + <hl>150%</hl>',
      ],
    }
  },
  {
    id: 115,
    content: {
      '队长': [
        '10 COMBO（连击）以上时，火属性角色攻击力 + 125%',
        '10 COMBO（连击）以上时，火属性角色攻击力 + <hl>140%</hl>',
      ],
      '能力1': [
        '自身攻击力 + 25%',
        '自身攻击力 + <hl>45%</hl>',
      ],
    }
  },
  {
    id: 121,
    content: {
      '技能': [
        '队伍全体获得强化弹射伤害提升效果(100% / 25s)',
        '队伍全体获得强化弹射伤害提升效果(<hl>120%</hl> / 25s)',
      ],
      '队长': [
        '强化弹射伤害 + 70%\n火属性角色的强化效果时间 + 10%',
        '强化弹射伤害 + <hl>90%</hl>\n火属性角色的强化效果时间 + 10%',
      ],
      '能力1': [
        '5 次Power Flip（强化弹射）时，火属性角色攻击力 + 5%[最大 + 25%]',
        '5 次Power Flip（强化弹射）时，火属性角色攻击力 + <hl>8%</hl>[最大 + <hl>40%</hl>]',
      ],
    }
  },
  {
    id: 135,
    content: {
      '队长': [
        '队伍全体攻击力 + 40%',
        '队伍全体攻击力 + <hl>100%</hl>',
      ]
    }
  },
  {
    id: 167,
    content: {
      '队长': [
          '火属性角色攻击力 + 30%\n火属性角色发动技能时，火属性角色攻击力 + 5%[最大 + 50%]',
          '火属性角色攻击力 + <hl>60%</hl>\n火属性角色发动技能时，火属性角色攻击力 + <hl>10%</hl>[最大 + <hl>100%</hl>]',
      ],
      '能力1': [
          '自身发动技能时，自身攻击力 + 15%[最大 + 60%]',
          '自身发动技能时，自身攻击力 + <hl>20%</hl>[最大 + <hl>80%</hl>]',
      ],
      '能力2': [
          '火属性角色发动技能时，自身攻击力 + 5%[最大 + 60%]',
          '火属性角色发动技能时，自身攻击力 + <hl>7%</hl>[最大 + <hl>70%</hl>]',
      ]
    }
  },
  {
    id: 173,
    content: {
      '技能': [
        '射出信号弹，请求海盗船对目标位置进行连续支援射击，对命中的敌人造成火属性伤害',
        '射出信号弹，请求海盗船对目标位置进行连续支援射击，对命中的敌人造成火属性伤害，<hl>赋予火属性角色攻击力提升效果(50% / 15s)</hl>',
      ],
      '队长': [
        '火属性角色生命值 + 15% & 攻击力 + 30%',
        '火属性角色生命值 + 15% & 攻击力 + <hl>65%</hl>',
      ],
    }
  },
  {
    id: 180,
    content: {
      '技能': [
        '技能能量：590',
        '技能能量：<hl>550</hl>',
      ],
      '队长': [
        '火属性角色攻击力 + 30%\n贯穿效果期间，火属性角色攻击力 + 45%',
        '火属性角色攻击力 + <hl>60%</hl>\n贯穿效果期间，火属性角色攻击力 + <hl>75%</hl>',
      ],
      '能力2': [
        '每击败 5 个敌人时，自身攻击力 + 6%[最大 + 60%]',
        '每击败 5 个敌人时，自身攻击力 + <hl>10%</hl>[最大 + 60%]',
      ],
      '能力3': [
        '作为主要角色编成：贯穿效果期间，火属性角色攻击力 + 60%',
        '作为主要角色编成：贯穿效果期间，火属性角色攻击力 + <hl>75%</hl>',
      ]
    }
  },
  {
    id: 199,
    content: {
      '队长': [
        '火属性角色技能伤害 + 100%',
        '火属性角色技能伤害 + <hl>150%</hl>',
      ],
    }
  },
  {
    id: 204,
    content: {
      '队长': [
        '火属性角色生命值 + 12% & 攻击力 + 30%',
        '火属性角色攻击力 + <hl>15%</hl> & 攻击力 + <hl>65%</hl>',
      ],
      '能力1': [
        '10 COMBO（连击）以上时，自身直接攻击伤害 + 100%',
        '10 COMBO（连击）以上时，自身直接攻击伤害 + <hl>110%</hl>',
      ],
      '能力2': [
        '自身直接攻击伤害 + 60%',
        '自身直接攻击伤害 + <hl>80%</hl>',
      ],
    }
  },
  {
    id: 219,
    content: {
      '队长': [
        '火属性角色发动技能时，该角色技能伤害 + 30%[最大 + 90%]\n战斗开始时，火属性角色技能槽 + 50%',
        '火属性角色发动技能时，该角色技能伤害 + <hl>40%</hl>[最大 + <hl>120%</hl>]\n战斗开始时，火属性角色技能槽 + 50%'
      ]
    }
  },
  {
    id: 235,
    content: {
      '队长': [
        '编入队伍中的角色的属性每增加 1 种时，队伍全体攻击力 + 5%[最大 + 30%] & 生命值 + 2.5%[最大 + 15%]',
        '编入队伍中的角色的属性每增加 1 种时，队伍全体攻击力 + <hl>15%</hl>[最大 + <hl>90%</hl>] & 生命值 + 2.5%[最大 + 15%]',
      ],
      '能力1': [
        '强化弹射伤害 + 25%',
        '强化弹射伤害 + <hl>30%</hl>',
      ],
    }
  },
  {
    id: 240,
    content: {
      '技能': [
        '技能能量：590',
        '技能能量：<hl>550</hl>',
      ],
      '队长': [
        '火属性角色攻击力 + 30%\n贯穿效果期间，火属性角色攻击力 + 60%',
        '火属性角色攻击力 + <hl>60%</hl>\n贯穿效果期间，火属性角色攻击力 + <hl>100%</hl>',
      ],
      '能力1': [
        '强化弹射伤害 + 25%',
        '强化弹射伤害 + <hl>30%</hl>',
      ],
      '能力2': [
        '贯穿效果期间，火属性角色攻击力 + 30%',
        '贯穿效果期间，火属性角色攻击力 + <hl>35%</hl>',
      ]
    }
  },
]
const up_data_water = [
  {
    id: 6,
    content: {
      '队长': [
        '水属性角色攻击力 + 30%\n每当达成 30 COMBO（连击）时，水属性角色攻击力 + 12%[最大 + 60%]',
        '水属性角色攻击力 + <hl>60%</hl>\n每当达成 30 COMBO（连击）时，水属性角色攻击力 + <hl>24%</hl>[最大 + <hl>120%</hl>]',
      ]
    }
  },
  {
    id: 7,
    content: {
      '队长': [
        '水属性角色生命值 + 40%',
        '水属性角色生命值 + 40% & <hl>攻击力 + 30%</hl>',
      ]
    }
  },
  {
    id: 120,
    content: {
      '队长': [
        '水属性角色攻击力 + 40% & 技能伤害 + 40%',
        '水属性角色攻击力 + <hl>60%</hl> & 技能伤害 + <hl>120%</hl>',
      ],
      '能力2': [
        '每当达成 30 COMBO（连击）时，自身攻击力 + 10%[最大 + 60%]',
        '每当达成 30 COMBO（连击）时，自身攻击力 + <hl>12.5%</hl>[最大 + <hl>75%</hl>]',
      ]
    }
  },
  {
    id: 127,
    content: {
      '队长': [
        '水属性角色攻击力 + 100%\n水属性角色的生命值低于 80% 时，（仅1次）该角色回复最大生命值的 20%',
        '水属性角色攻击力 + <hl>120%</hl>\n水属性角色的生命值低于 80% 时，（仅1次）该角色回复最大生命值的 20%',
      ]
    }
  },
  {
    id: 139,
    content: {
      '技能': [
        '<span style="color: red;">TODO</span>',
        '',
      ],
      '队长': [
        '水属性角色攻击力 + 40% & 直接攻击伤害 + 60%',
        '水属性角色攻击力 + <hl>60%</hl> & 直接攻击伤害 + <hl>160%</hl>',
      ],
      '能力3': [
        '作为主要角色编成：自身生命值 50% 以上时，水属性角色直接攻击伤害 + 60%\n自身生命值 80% 以上时，自身直接攻击伤害 + 120%',
        '作为主要角色编成：自身生命值 50% 以上时，水属性角色直接攻击伤害 + <hl>70%</hl>\n自身生命值 80% 以上时，自身直接攻击伤害 + <hl>150%</hl>',
      ]
    }
  },
  {
    id: 152,
    content: {
      '能力1': [
        '每当自身直接攻击 10 次时，自身直接攻击伤害 + 10%[最大 + 150%]',
        '每当自身直接攻击 10 次时，自身直接攻击伤害 + <hl>20%</hl>[最大 + <hl>160%</hl>]',
      ],
      '能力2': [
        '自身是水属性角色时，贯穿效果期间，自身直接攻击伤害 + 120%',
        '自身是水属性角色时，贯穿效果期间，自身直接攻击伤害 + <hl>150%</hl>',
      ],
      '能力3': [
        '作为主要角色编成：自身获得的攻击提升效果每达到 1 个，自身直接攻击伤害 + 50%[最大 + 250%]',
        '作为主要角色编成：自身获得的攻击提升效果每达到 1 个，自身直接攻击伤害 + <hl>80%</hl>[最大 + <hl>400%</hl>]',
      ]
    }
  },
  {
    id: 161,
    content: {
      '队长': [
        '水属性角色发动技能时，水属性角色攻击力 + 10%[最大 + 120%]',
        '水属性角色发动技能时，水属性角色攻击力 + <hl>17.5%</hl>[最大 + <hl>210%</hl>]',
      ]
    }
  },
  {
    id: 198,
    content: {
      '队长': [
        '水属性角色生命值 + 10%\n水属性角色生命值 80% 以上时，该角色攻击力 + 100%',
        '水属性角色生命值 + 10%\n水属性角色生命值 80% 以上时，该角色攻击力 + <hl>150%</hl>',
      ]
    }
  },
  {
    id: 206,
    content: {
      '技能': [
        '一辆疾驰的卡车突然出现于自身前方，对冲撞到的敌人造成水属性伤害(19x / 5hit) / 赋予强化弹射伤害提升(100% / 20s)效果',
        '一辆疾驰的卡车突然出现于自身前方，对冲撞到的敌人造成水属性伤害(19x / <hl>8hit</hl>) / 赋予强化弹射伤害提升(100% / 20s)效果',
      ],
      '队长': [
        '进入Fever模式时，获得 20 秒Power Flip（强化弹射）伤害 + 60%\n水属性角色生命值 + 20%',
        '进入Fever模式时，获得 20 秒Power Flip（强化弹射）伤害 + <hl>200%</hl>\n水属性角色生命值 + 20%',
      ],
      '能力3': [
        '作为主要角色编成：进入Fever模式时，获得 20 秒Power Flip（强化弹射）伤害 + 250%',
        '作为主要角色编成：进入Fever模式时，获得 20 秒Power Flip（强化弹射）伤害 + <hl>280%</hl>',
      ]
    }
  },
  {
    id: 236,
    content: {
      '技能': [
        '<span style="color: red;">TODO</span>',
        '',
      ],
      '队长': [
        '水属性角色攻击力 + 40% & 直接攻击伤害 + 60%',
        '水属性角色攻击力 + <hl>60%</hl> & 直接攻击伤害 + <hl>160%</hl>',
      ],
      '能力1': [
        '自身获得的攻击提升效果每达到 1 个，自身攻击力 + 16%[最大 + 80%]',
        '自身获得的攻击提升效果每达到 1 个，自身攻击力 + <hl>20%</hl>[最大 + <hl>100%</hl>]',
      ],
      '能力2': [
        '自身是水属性角色时，自身获得攻击提升效果时，获得 15 秒自身的攻击力 + 80%（CT: 30 秒）',
        '自身是水属性角色时，自身获得攻击提升效果时，获得 <hl>20 秒</hl>自身的攻击力 + 80%（CT: 30 秒）',
      ],
      '能力3': [
        '作为主要角色编成：自身对弱体效果中的敌人造成的直接攻击伤害 + 200%',
        '作为主要角色编成：自身对弱体效果中的敌人造成的直接攻击伤害 + <hl>300%</hl>',
      ],
      '能力4': [
        '战斗开始时，自身技能槽 + 50%',
        '战斗开始时，自身技能槽 + 50% & <hl>棺柩计数 - 2</hl>',
      ]
    }
  },
  {
    id: 262,
    content: {}
  },
  {
    id: 271,
    content: {}
  },
  {
    id: 24,
    content: {}
  },
  {
    id: 25,
    content: {}
  },
  {
    id: 27,
    content: {}
  },
  {
    id: 28,
    content: {}
  },
  {
    id: 29,
    content: {}
  },
  {
    id: 141,
    content: {}
  },
  {
    id: 197,
    content: {}
  },
  {
    id: 149,
    content: {}
  },
  {
    id: 163,
    content: {}
  },
  {
    id: 168,
    content: {}
  },
  {
    id: 226,
    content: {}
  },
  {
    id: 246,
    content: {}
  },
  {
    id: 275,
    content: {}
  },
]
const up_data_thunder = [
  {
    id: 212,
    content: {
      '队长': [
        '队伍全体技能伤害 + 80%',
        '队伍全体技能伤害 + <hl>120%</hl>',
      ],
      '能力3': [
        '作为主要角色编成：自身处于技能伤害提升效果期间，雷属性角色技能伤害 + 50%\n作为主要角色编成：进入Fever模式时，雷属性角色攻击力 + 25%[最大 + 50%]',
        '作为主要角色编成：自身处于技能伤害提升效果期间，雷属性角色技能伤害 + <hl>60%</hl>\n作为主要角色编成：进入Fever模式时，雷属性角色攻击力 + 25%[最大 + 50%]',
      ],
      '能力4': [
        '战斗开始时，自身技能槽 + 35%',
        '战斗开始时，自身技能槽 + 35% & <hl>棺柩计数 - 2</hl>',
      ]
    }
  },
]
const up_data_wind = [
  {
    id: 207,
    content: {
      '技能': [
        '<span style="color: red;">TODO</span>',
        '',
      ],
      '队长': [
        '风属性角色攻击力 + 40%\n强化弹射伤害 + 40%',
        '风属性角色攻击力 + <hl>100%</hl>\n强化弹射伤害 + <hl>70%</hl>',
      ],
      '能力1': [
        '自身发动技能时，获得 15 秒自身连击效果[直接攻击计算为 2 次 / 合计伤害 + 20%]',
        '自身发动技能时，获得 <hl>20</hl> 秒自身连击效果[直接攻击计算为 2 次 / 合计伤害 + 20%]',
      ],
      '能力3': [
        '<span style="color: red;">TODO</span>',
        '',
      ],
      '能力5': [
        '战斗开始时，自身技能槽 + 50%',
        '战斗开始时，自身技能槽 + 50% & <hl>棺柩计数 - 2</hl>',
      ],
    }
  },
]
const up_data_light = [
  {
    id: 210,
    content: {
      '技能': [
        '<span style="color: red;">TODO</span>',
          '',
      ],
      '队长': [
          '队伍全体攻击力 + 60%',
          '队伍全体攻击力 + <hl>125%</hl>',
      ],
      '能力4': [
          '战斗开始时，自身技能槽 + 50%',
          '战斗开始时，自身技能槽 + 50% & <hl>棺柩计数 - 2</hl>',
      ],
      '能力6': [
          '自身发动技能时，光属性角色攻击力 + 6%[最大 + 30%]',
          '自身发动技能时，光属性角色攻击力 + <hl>7.5%</hl>[最大 + 30%]',
      ]
    }
  },
]
const up_data_dark = [
  {
    id: 211,
    content: {
      '队长': [
        '队伍全体技能伤害 + 50%\n队伍角色发动技能时，该角色技能伤害 + 30%[最大 + 90%]',
        '队伍全体技能伤害 + <hl>80%</hl>\n队伍角色发动技能时，该角色技能伤害 + <hl>40%</hl>[最大 + <hl>120%</hl>]',
      ],
      '能力3': [
        '作为主要角色编成：每击败 5 个敌人时，暗属性角色技能伤害 + 10%[最大 + 150%]',
        '作为主要角色编成：每击败 5 个敌人时，暗属性角色技能伤害 + <hl>12.5%</hl>[最大 + 150%]',
      ],
      '能力4': [
        '自身的棺柩计数 - 2\n队伍全体技能伤害 + 15%',
        '自身的棺柩计数 - 2\n队伍全体技能伤害 + <hl>20%</hl>',
      ],
      // '能力6': [
      //   '自身发动技能时，队伍全体技能伤害 + 8%[最大 + 40%]',
      //   '自身发动技能时，队伍全体技能伤害 + <hl>10%</hl>[最大 + <hl>40%</hl>]',
      // ]
    }
  },
  {
    id: 209,
    content: {
      '技能': [
        '<span style="color: red;">TODO</span>',
        '',
      ],
      '队长': [
        '强化弹射伤害 + 60% & 协力球生命值 + 10%',
        '强化弹射伤害 + <hl>100%</hl> & 协力球生命值 + 10%',
      ],
      '能力4': [
        '强化弹射伤害 + 15%',
        '强化弹射伤害 + 15% & <hl>棺柩计数 - 2</hl>',
      ]
    }
  },
]
const up_datas = {
  'fire': up_data_fire,
  'water': up_data_water,
  'thunder': up_data_thunder,
  'wind': up_data_wind,
  'light': up_data_light,
  'dark': up_data_dark,
}
const ele2color = {
  'fire': 'rgba(234,53,75,0.925)',
  'water': 'rgb(68,137,255,0.925)',
  'thunder': 'rgb(244,204,36,0.925)',
  'wind': 'rgb(119,217,47,0.925)',
  'light': 'rgb(245,255,186,0.925)',
  'dark': 'rgb(90,57,95,0.925)',
}
const ele2border_color = {
  'fire': 'rgb(234,53,75)',
  'water': 'rgb(68,137,255)',
  'thunder': 'rgb(244,204,36)',
  'wind': 'rgb(119,217,47)',
  'light': 'rgb(136,136,136)',
  'dark': 'rgb(90,57,95)',
}
const ele2name = {
  'fire': '火属性',
  'water': '水属性',
  'thunder': '雷属性',
  'wind': '风属性',
  'light': '光属性',
  'dark': '暗属性',
}
</script>

<template>
  <div style="
      background: url(/assets/worldflipper/ui/background_cut_official.png);
      background-size: 136px;
      background-position-x: -10px;
      background-position-y: -10px;
      image-rendering: pixelated;
      width: fit-content;
      padding: 16px;
      border-radius: 16px;
      box-shadow: 0 0 8px #000000a5;
">
  <div
      style="
        display: flex;
        width: 1036px;
        padding: 16px 0;
        /*background-color: #00ff00;*/
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        image-rendering: initial;
      "
  >

  <!--  v-for="i in Object.keys(unit_data)"-->
    <div
        style="
          width: 998px;
          margin: 8px;
          display: flex;
          flex-direction: row;
          /*font-family: SY, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;;*/
          /*background-color: rgb(234,53,75);*/
          /*padding: 16px;*/
          /*padding: 3px;*/
          border-radius: 16px;
        "
        v-for="(up_data, element_id) in up_datas"
        :style="{
          'background-color': ele2color[element_id]
        }"
    >
      <div
          style="
            background-color: white;
            width: 31px;
            border-top-left-radius: 13px;
            border-bottom-left-radius: 13px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 3px solid;
            box-sizing: content-box;
          "
          :style="
          {
            'border-color': ele2border_color[element_id],
            // 'color': element_id === 'light' ? 'rgb(136,136,136)' : 'white'
          }
          "
      >
        <img style="width: 28px; height: 28px;" :src="'/assets/worldflipper/icon/' + element_id + '.png'" alt=""/>
        <p style="font-size: 24px; width: 24px; line-height: 28px; font-weight: bold; color: black;">
          {{ ele2name[element_id] }}
        </p>
      </div>
      <div
        style="
          display: flex;
          flex-direction: column;
          width: 100%;
          padding: 18px 28px 18px 16px;
          /*color: white;*/
          /*color: black;*/
          font-weight: 500;
        "
        :style="
        {
          'color': element_id === 'light' ? 'rgb(136,136,136)' : 'white'
        }
        "
      >
        <div
            style="
              display: flex;
              /*padding: 0 0 0 7px;*/
              /*margin: 0 15px 0 7px;*/
              flex-direction: row;
              width: 100%;
              /*border: 3px solid #ffffff60;*/
              /*box-sizing: border-box;*/
              margin: 4px;
              border: 3px solid #ffffff60;
              box-sizing: border-box;
              /*box-shadow: 0 0 3px white;*/
              border-radius: 8px;
              /*flex-direction: row;*/
              /*width: 100%;*/
            "
        >
          <div style="display: flex; flex-direction: column; width: 100%;">

            <div style="display: flex; width: 100%; height: 100%;">

              <div
                  style="
              box-shadow: 0 0 1px black;
              padding: 4px;
              min-width: 98px;
              /*color: white;*/
              /*color: black;*/
              text-align: center;
              font-size: 18px;
              border-radius: 6px 0 0 6px;
            "
              >
                角色
              </div>
              <div
                  style="
              box-shadow: 0 0 1px black;
              /*flex: 1;*/
              padding: 4px;
              font-size: 16px;
              /*color: white;*/
              /*width: 24px;*/
              width: 60px;
              display: flex;
              align-items: center;
            "
              >
              </div>
              <div
                  style="
              box-shadow: 0 0 1px black;
              flex: 1;
              padding: 4px;
              /*color: white;*/
              text-align: center;
              font-size: 18px;
            "
              >
                上修前
              </div>
              <div
                  style="
              box-shadow: 0 0 1px black;
              flex: 1;
              padding: 4px;
              /*color: white;*/
              text-align: center;
              font-size: 18px;
              border-radius:  0 6px 6px 0;
            "
              >
                上修后
              </div>
            </div>
          </div>
        </div>
        <div
            v-if="Object.keys(unit_data).length"
            v-for="i in up_data"
            style="
              display: flex;
              margin: 4px;
              border: 3px solid #ffffff60;
              box-sizing: border-box;
              /*box-shadow: 0 0 3px white;*/
              border-radius: 8px;
              flex-direction: row;
              width: 100%;
            "
        >
          <div
              style="
              /*box-shadow: 0 0 1px black;*/
            "
          >
            <UnitPicInfo :unit_data="unit_data[i.id]" style="margin: 4px;"/>
          </div>
          <div style="display: flex; flex-direction: column; width: 100%;">

            <div v-for="(j, name) in i.content" style="display: flex; width: 100%; height: 100%;">
              <div
                  style="
                    box-shadow: 0 0 1px black;
                    /*flex: 1;*/
                    padding: 16px 4px;
                    font-size: 16px;
                    /*color: white;*/
                    /*width: 24px;*/
                    width: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    /*background-color:#ffffff55;*/
                    /*flex-direction: column;*/
                  "
              >
                <p style="text-align: center;">
                  {{ name }}
                </p>
              </div>
              <div
                  style="
                    box-shadow: 0 0 1px black;
                    flex: 1;
                    padding: 8px;
                    font-size: 16px;
                    /*color: white;*/
                    display: flex;
                    /*text-align: center;*/
                    width: fit-content;
                    flex-direction: column;
                    justify-content: center;
                    /*background-color:#ffffff22;*/
                  "
              >
                <div v-html="j[0].replace('\n', '<p></p>')"></div>
              </div>
              <div
                  style="
                    box-shadow: 0 0 1px black;
                    flex: 1;
                    padding: 8px;
                    font-size: 16px;
                    /*color: white;*/
                    display: flex;
                    /*text-align: center;*/
                    width: fit-content;
                    flex-direction: column;
                    justify-content: center;
                    /*background-color:#ffffff55;*/
                  "
              >
                <div v-html="j[1].replace('\n', '<p></p>')"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>


<style>
hl {
  background-color: rgba(255, 115, 0, 0.65);
  padding: 0 4px;
  border-radius: 6px;
}
</style>