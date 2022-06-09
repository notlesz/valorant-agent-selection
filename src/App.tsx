import { FormEvent, useEffect, useState } from "react";
import { Agent, AgentInfo, AgentAbility } from "./@types/agents";
import AgentInfoSelect from "./components/AgentInfoSelect";
import { useVoiceAgent } from "./hooks/useVoiceAgent";
import { getListAgents } from "./services/api";
import { languages } from './util/languages'
function App() {
  const [listAgents, setListAgents] = useState<Agent[]>([]);
  const [agentView, setAgentView] = useState<Agent>();
  const [agentInfo, setAgentInfo] = useState<AgentInfo>();
  const [agentAbility, setAgentAbility] = useState<AgentAbility>();
  const [showAgentInfo, setShowAgentInfo] = useState<boolean>(false);
  const [showAgentAbility, setShowAgentAbility] = useState<boolean>(false);
  const [language, setLanguage] = useState('pt-BR')

  const { setVoice } = useVoiceAgent();

  const getAgents = async (code: string = 'pt-BR') => {
    const { data } = await getListAgents(code);
    setListAgents(data.data);
  };

  const playVoiceAgent = (audio: string) => {
    setVoice(audio);
  };

  const handleShowAgentInfo = () => {
    setShowAgentInfo(true);
    setShowAgentAbility(false);
    setAgentAbility(undefined)
  };

  const handleShowAgentAbility = () => {
    setShowAgentInfo(false);
    setShowAgentAbility(true);
    setAgentInfo(undefined)
  };

  const handleChangelanguage = (option: string) => {
    setLanguage(option)
  }

  useEffect(() => {
    getAgents();
  }, []);

  useEffect(() => {
    setAgentView(undefined)
    getAgents(language)
  }, [language])

  return (
    <main
      className={` flex flex-col items-center ${agentView ? "justify-between" : "justify-end"
        } h-[100vh] overflow-hidden max-w-[1600px] w-full  ml-auto mr-auto m-0 `}
    >
      {agentView ? (
        <div>
          <img
            src={agentView.bustPortrait}
            alt={agentView.displayName}
            className=" lg:w-[700px] 2xl:w-[100%] h-[100%] lg:mt-[20px] 2xl:mt-[30px]"
          />

          <div className="absolute left-[75%] lg:top-[20px] 2xl:top-[10%] 2xl:right-[20%] w-[300px] 2xl:w-[400px]">
            <div className="flex flex-col">
              <span className="lg:text-[13px] 2xl:text-[18px] text-white font-codePro uppercase bold tracking-[4px] ">
                {agentView.role.displayName}
              </span>
              <span className="text-[50px] 2xl:text-[65px] text-primary font-anton uppercase">
                {agentView.displayName}
              </span>
            </div>
            <div className='flex flex-col'>
              <div className="flex gap-[16px]">
                <div
                  onClick={() => {
                    handleShowAgentInfo();
                    setAgentInfo(agentView);
                  }}
                  className={`2xl:w-[40%] 2xl:h-[60px] flex justify-center items-center border-solid border-[1px] border-transparent hover:bg-select rounded ${agentView === agentInfo ? 'bg-select' : '' }`}
                >
                  <img
                    src={agentView.role.displayIcon}
                    alt=""
                    className="w-[30px] h-[30px] 2xl:w-[40px] 2xl:h-[40px] cursor-pointer"
                  />
                </div>
                {agentView.abilities.map(
                  (ability) =>
                    ability.displayIcon && (
                      <div
                        onClick={() => {
                          handleShowAgentAbility();
                          setAgentAbility(ability);
                        }}
                        className={`2xl:w-[40%] 2xl:h-[60px] flex justify-center items-center hover:bg-select border-solid border-[1px] border-transparent rounded ${agentAbility === ability ? 'bg-select' : ''}`}
                      >
                        <img
                          src={ability.displayIcon}
                          alt={ability.displayName}
                          className="w-[30px] h-[30px] 2xl:w-[40px] 2xl:h-[40px] cursor-pointer"
                        />
                      </div>
                    )
                )}
              </div>
              <AgentInfoSelect agentAbility={agentAbility} agentInfo={agentInfo} showAbility={showAgentAbility} showInfo={showAgentInfo} />
            </div>
          </div>
        </div>
      ) : (
        <h1 className="font-anton text-[50px] text-primary uppercase absolute top-[40%]">
        {languages.map( (languageSelect) => {
          if(languageSelect.code === language) return languageSelect.textTranslate 
        })}
        </h1>
      )}

      <div className="flex flex-wrap gap-[5px] lg:w-[800px] 2xl:w-[1100px] absolute bottom-2">
        {listAgents.length > 0 && (
          <>
            {listAgents.map((agent) => (
              <div
                onClick={() => {
                  playVoiceAgent(agent.voiceLine.mediaList[0].wave);
                  setAgentView(agent);
                  setAgentInfo(agent);
                  handleShowAgentInfo();
                }}
                className={`border-solid border-[1px] border-zinc-400 hover:bg-select ${agent === agentView ? 'bg-select' : ''}`}
              >
                <img
                  src={agent.displayIcon}
                  alt={agent.displayName}
                  className="2xl:w-[100px] 2xl:h-[100px] lg:w-[70px] lg:h-[70px] cursor-pointer"
                />
              </div>
            ))}
          </>
        )}
      </div>

      <div className='absolute right-[70%] lg:top-[20px] 2xl:right-[80%] 2xl:top-[30px]'>
        <label htmlFor="language" className="font-anton text-primary text-[23px]">Language </label>
        <select value={language} onChange={(option) => handleChangelanguage(option.target.value)} name="language" id="language" className="bg-black border-solid border-[1px] border-primary font-anton px-[10px] text-primary">
          {languages.map((language, id) => (
            <option  key={id} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
      </div>
    </main>
  );
}

export default App;
