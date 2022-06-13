import { AgentAbility, AgentInfo } from "../@types/agents";

interface Props {
  agentInfo: AgentInfo | undefined;
  agentAbility: AgentAbility | undefined;
  showAbility: boolean;
  showInfo: boolean;
}

function SelectedAgentInfo({
  agentInfo,
  showInfo,
  agentAbility,
  showAbility,
}: Props) {
  return (
    <div>
      {agentInfo && showInfo && (
        <div className="flex flex-col text-white gap-[15px] mt-[20px] font-poppins ">
          <span className="text-secondary lg:text-xs 2xl:text-sm">{agentInfo.description}</span>
          <div className="flex flex-col">
            <span className="lg:text-base 2xl:text-lg font-codePro uppercase bold">{agentInfo.role.displayName}</span>
            <span className="lg:text-xs 2xl:text-sm">{agentInfo.role.description}</span>
          </div>
        </div>
      )}
      {agentAbility && showAbility && (
        <div className="flex flex-col text-white mt-[20px] font-poppins">
          <span className="lg:text-lg uppercase bold font-anton">{agentAbility.displayName}</span>
          <span className="lg:text-sm">{agentAbility.description}</span>
        </div>
      )}
    </div>
  );''
}

export default SelectedAgentInfo;
