import { FormEvent, useEffect, useState } from "react";
import { Agent, AgentInfo, AgentAbility } from "./@types/agents";
import AgentList from "./components/AgentList";
import SelectedAgentInfo from "./components/SelectedAgentInfo";
import { useVoiceAgent } from "./hooks/useVoiceAgent";
import { getListAgents } from "./services/api";
import { languages } from "./util/languages";

function App() {
  const [agentList, setAgentList] = useState<Agent[]>([]);
  const [agentView, setAgentView] = useState<Agent>();
  const [agentInfo, setAgentInfo] = useState<AgentInfo>();
  const [agentAbility, setAgentAbility] = useState<AgentAbility>();
  const [showAgentInfo, setShowAgentInfo] = useState<boolean>(false);
  const [showAgentAbility, setShowAgentAbility] = useState<boolean>(false);
  const [language, setLanguage] = useState("pt-BR");

  const { setVoice, pause } = useVoiceAgent();

  const getAgents = async (code: string = "pt-BR") => {
    const { data } = await getListAgents(code);
    setAgentList(data.data);
  };

  const handleAgentAudio = (audio: string | undefined) => {
    pause();
    setVoice(audio);
  };

  const handleAgentView = (agent: Agent) => {
    setAgentView(agent);
  };

  const handleAgentInfo = (agent: AgentInfo) => {
    setAgentInfo(agent);
  };

  const handleShowAgentInfo = () => {
    setShowAgentInfo(true);
    setShowAgentAbility(false);
    setAgentAbility(undefined);
  };

  const handleShowAgentAbility = () => {
    setShowAgentInfo(false);
    setShowAgentAbility(true);
    setAgentInfo(undefined);
  };

  const handleLanguageChange = (option: string) => {
    setLanguage(option);
  };

  useEffect(() => {
    getAgents();
  }, []);

  useEffect(() => {
    handleAgentAudio(undefined)
    setAgentView(undefined);
    getAgents(language);
  }, [language]);

  return (
    <main
      className={` flex flex-col items-center ${
        agentView ? "justify-between" : "justify-end"
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
            <div className="flex flex-col">
              <div className="flex gap-[16px]">
                <div
                  onClick={() => {
                    handleShowAgentInfo();
                    setAgentInfo(agentView);
                  }}
                  className={`2xl:w-[40%] 2xl:h-[60px] flex justify-center items-center border-solid border-[1px] border-transparent hover:bg-select rounded ${
                    agentView === agentInfo ? "bg-select" : ""
                  }`}
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
                        className={`cursor-pointer 2xl:w-[40%] 2xl:h-[60px] flex justify-center items-center hover:bg-select border-solid border-[1px] border-transparent rounded ${
                          agentAbility === ability ? "bg-select" : ""
                        }`}
                      >
                        <img
                          src={ability.displayIcon}
                          alt={ability.displayName}
                          className="w-[30px] h-[30px] 2xl:w-[40px] 2xl:h-[40px]"
                        />
                      </div>
                    )
                )}
              </div>
              <SelectedAgentInfo
                agentAbility={agentAbility}
                agentInfo={agentInfo}
                showAbility={showAgentAbility}
                showInfo={showAgentInfo}
              />
            </div>
          </div>
        </div>
      ) : (
        <h1 className="font-anton text-[50px] text-primary uppercase absolute top-[40%]">
          {languages.map((languageSelect) => {
            if (languageSelect.code === language)
              return languageSelect.textTranslate;
          })}
        </h1>
      )}

      <AgentList
        agentList={agentList}
        agentView={agentView}
        handleAgentInfo={handleAgentInfo}
        handleAgentAudio={handleAgentAudio}
        handleAgentView={handleAgentView}
        handleShowAgentInfo={handleShowAgentInfo}
      />

      <div className="absolute right-[70%] lg:top-[20px] 2xl:right-[80%] 2xl:top-[30px]">
        <label
          htmlFor="language"
          className="font-anton text-primary text-[23px]"
        >
          Language{" "}
        </label>
        <select
          value={language}
          onChange={(option) => handleLanguageChange(option.target.value)}
          name="language"
          id="language"
          className="bg-black border-solid border-[1px] border-primary font-anton px-[10px] text-primary"
        >
          {languages.map((language, id) => (
            <option key={id} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
      </div>
    </main>
  );
}

export default App;
