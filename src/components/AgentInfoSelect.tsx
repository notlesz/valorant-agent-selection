import { AgentAbility, AgentInfo } from "../@types/agents";

interface Props {
  agentInfo: AgentInfo | undefined;
  agentAbility: AgentAbility | undefined;
  showAbility: boolean;
  showInfo: boolean;
}

function AgentInfoSelect({
  agentInfo,
  showInfo,
  agentAbility,
  showAbility,
}: Props) {
  return (
    <div>
      {agentInfo && showInfo && (
        <div className="flex flex-col text-white gap-[15px] mt-[20px]">
          <span className="text-[#d4dbc0]">{agentInfo.description}</span>
          <div className="flex flex-col">
            <span>{agentInfo.role.displayName}</span>
            <span>{agentInfo.role.description}</span>
          </div>
        </div>
      )}
      {agentAbility && showAbility && (
        <div className="flex flex-col text-white gap-[15px] mt-[20px]">
          <span>{agentAbility.displayName}</span>
          <span>{agentAbility.description}</span>
        </div>
      )}
    </div>
  );
}

export default AgentInfoSelect;
