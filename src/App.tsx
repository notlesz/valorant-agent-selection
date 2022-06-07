import { useEffect, useState } from "react";
import { Agent } from "./@types/agents";
import { useVoiceAgent } from "./hooks/useVoiceAgent";
import { getListAgents } from "./services/api";

interface AgentInfo {
  abilities?: [
    {
      slot: string;
      displayName: string;
      description: string;
      displayIcon: string;
    }
  ];

}

function App() {
  const [listAgents, setListAgents] = useState<Agent[]>([]);
  const [agentView, setAgentView] = useState<Agent>();
  const [agentInfos, setAgentInfo] = useState({});

  const { setVoice } = useVoiceAgent();
  const getAgents = async () => {
    const { data } = await getListAgents();
    setListAgents(data.data);
    console.log(data.data);
  };

  const playVoiceAgent = (audio: string) => {
    setVoice(audio);
  };

  useEffect(() => {
    getAgents();
  }, []);

  return (
    <main
      className={`relative flex flex-col items-center ${
        agentView ? "justify-between" : "justify-end"
      } h-[90vh] overflow-hidden `}
    >
      {agentView && (
        <div>
          <img
            src={agentView.bustPortrait}
            alt={agentView.displayName}
            className=" w-[600px] h-[100%]"
          />

          <div className="absolute left-[70%] top-[10%] bg-[#000]">
            <div className="flex flex-col">
              <span className="text-[18px] text-white font-codePro uppercase bold ">
                {agentView.role.displayName}
              </span>
              <span className="text-[50px] text-white font-anton uppercase ">
                {agentView.displayName}
              </span>
            </div>
            <div className="flex gap-[16px]">
              <div>
                <img
                  src={agentView.role.displayIcon}
                  alt=""
                  className="w-[40px] h=[40px]"
                />
              </div>
              {agentView.abilities.map(
                (ability) =>
                  ability.displayIcon && (
                    <div>
                      <img
                        src={ability.displayIcon}
                        alt={ability.displayName}
                        className="w-[40px] h=[40px]"
                      />
                    </div>
                  )
              )}
            </div>
            <div>

            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-[10px] w-[1100px]">
        {listAgents.length > 0 && (
          <>
            {listAgents.map((agent) => (
              <div
                onClick={() => {
                  playVoiceAgent(agent.voiceLine.mediaList[0].wave);
                  setAgentView(agent);
                }}
              >
                <img
                  src={agent.displayIcon}
                  alt={agent.displayName}
                  className="w-[100px] h=[100px]"
                />
              </div>
            ))}
          </>
        )}
      </div>
    </main>
  );
}

export default App;
