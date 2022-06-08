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
        <div className="flex flex-col text-white gap-[15px] mt-[20px] font-poppins ">
          <span className="text-[#d0e790] lg:text-xs">{agentInfo.description}</span>
          <div className="flex flex-col">
            <span className="lg:text-base font-codePro uppercase bold">{agentInfo.role.displayName}</span>
            <span className="lg:text-xs">{agentInfo.role.description}</span>
          </div>
        </div>
      )}
      {agentAbility && showAbility && (
        <div className="flex flex-col text-white gap-[15px] mt-[20px] font-poppins">
          <span className="lg:text-lg uppercase bold font-codePro">{agentAbility.displayName}</span>
          <span className="lg:text-sm">{agentAbility.description}</span>
        </div>
      )}
    </div>
  );''
}

export default AgentInfoSelect;
