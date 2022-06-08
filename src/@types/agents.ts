export interface Agent {
  uuid: string;
  abilities: [
    {
      slot: string;
      displayName: string;
      description: string;
      displayIcon: string;
    }
  ];
  description: string;
  displayName: string;
  displayIcon: string;
  fullPortrait: string;
  fullPortraitV2: string;
  bustPortrait: string;
  role: {
    description: string;
    displayName: string;
    displayIcon: string;
  };
  voiceLine: {
    mediaList: [
      {
        id: number;
        wave: string;
      }
    ];
  };
}

export interface AgentAbility {
  slot: string;
  displayName: string;
  description: string;
  displayIcon: string;
}

export interface AgentInfo {
  description: string;
  role: {
    description: string;
    displayName: string;
  };
}