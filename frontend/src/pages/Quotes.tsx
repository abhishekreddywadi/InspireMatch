import axios from "axios";
import { useEffect, useState } from "react";
import {
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import AppBar from "../components/AppBar";

const Quotes = () => {
  // making state to handle options
  const [option, setOption] = useState("happy");
  const [data, setData] = useState(
    "“Be the change that you wish to see in the world.”"
  );
  const [customInput, setCustomInput] = useState("");
  // share state
  const [shareState, setShareState] = useState(false);
  const [customOutput, setCustomOutput] = useState(
    "Happiness does not have a limit. "
  );
  const [loading, setLoading] = useState(false);
  const [loadingCustom, setloadingCustom] = useState(false);
  // getting all saved quotes

  // checkbox state
  const [checkbox, setCheckbox] = useState(false);
  console.log(checkbox);
  // handling onChange event
  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value);
  };
  // handling custom input events
  const handleCustomInputSubmit = async () => {
    // console.log("Input changed: ", customInput);
    // fetch custom input from gemini
    setloadingCustom(true);
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBYpqbGCFwf4jf4_V8ZoVCfP0h8KNVk0DI",
      method: "POST",
      data: {
        contents: [
          {
            parts: [
              {
                text: `${customInput} generate maximum two lines `,
              },
            ],
          },
        ],
      },
    });
    setCustomOutput(response.data?.candidates[0].content.parts[0].text);
    console.log(response.data?.candidates[0].content.parts[0].text);
    setloadingCustom(false);
  };
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with option: ", option); // log the selected option
    // fetching the data from gemini
    setLoading(true);
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBYpqbGCFwf4jf4_V8ZoVCfP0h8KNVk0DI",
      method: "POST",
      data: {
        contents: [
          {
            parts: [
              {
                text: ` tell me one  ${
                  option && option
                } quote of the day and generate different quote whenever i ask you and give me direct quote not anything else`,
              },
            ],
          },
        ],
      },
    });
    setData(response.data?.candidates[0].content.parts[0].text);
    console.log(response.data?.candidates[0].content.parts[0].text);
    setLoading(false);
  };

  useEffect(() => {
    console.log(option); // Log after state updates
  }, [option]);

  return (
    <>
      <AppBar />
      <div className="flex flex-col items-center w-full">
        <div className="w-[80vw] shadow-xl flex flex-col items-center  ">
          <div className="flex gap-6 items-center justify-center mt-5">
            <form
              className="flex gap-6 w-[50vw]items-center justify-center"
              onSubmit={onSubmitHandler}
            >
              <select
                value={option}
                onChange={handleOptionChange}
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-5 py-2.5 font-medium"
              >
                <option value="happy">happy</option>
                <option value="sad">sad</option>
                <option value="angry">angry</option>
                <option value="romantic">romantic</option>
                <option value=""></option>
              </select>
              <button
                type="submit"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                generate Quote
              </button>
            </form>
            {/* adding button  */}
          </div>

          {/* quote block */}
          <div className=" transition-all duration-300 ease-in-out text-xl italic font-semibold text-white  px-9 py-6 m-5  rounded-md  text-center text-pretty">
            {loading ? (
              <div className="  transition-all duration-300 ease-in-out text-center text-gray-600 dark:text-black">
                Loading...
              </div>
            ) : (
              <blockquote className=" hell relative transition-all duration-300 ease-in-out text-xl italic font-semibold text-black px-9 py-6 m-5  rounded-md text-center text-pretty">
                <p>{data}</p>
              </blockquote>
            )}
          </div>
          {/* save button */}
          <a
            href="#_"
            onClick={() => {
              // saving the quote in local storage
              localStorage.setItem(`${Math.floor(Math.random() * 100)}`, data);
              alert("Quote saved successfully!");
            }}
            className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group mx-auto my-3 justify-self-center w-fit ml-6"
          >
            <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
            <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
              save the quote
            </span>
          </a>
          <div></div>
          {/* check box */}
          <div>
            <div className="flex items-center mt-8 ml-8 ">
              <input
                onChange={(e) => setCheckbox(e.target.checked)}
                id="checked-checkbox"
                type="checkbox"
                // value={checkbox}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 "
              />
              <label
                htmlFor="checked-checkbox"
                className="ms-2 text-sm font-medium text-gray-900 "
              >
                Generate your own ?
              </label>
            </div>
          </div>
          {/* custom quote block */}
          {checkbox && (
            <div>
              <form
                className="max-w-sm mx-auto"
                onSubmit={(e) => e.preventDefault()}
              >
                <label
                  htmlFor="custom-quote"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Enter your mood
                </label>
                <input
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  id="custom-quote"
                  name="custom-quote"
                  className="border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="button"
                  onClick={handleCustomInputSubmit}
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-4"
                >
                  generate a quote
                </button>
              </form>
              <div>
                {loadingCustom ? (
                  <p>Loading...</p>
                ) : (
                  <blockquote className="text-xl italic font-semibold px-9 py-6 m-5  rounded-md text-center text-pretty">
                    <p>{customOutput}</p>
                  </blockquote>
                )}
              </div>
            </div>
          )}
          <div className="flex ml-7 items-center gap-4">
            <button
              type="button"
              onClick={() => setShareState((prv) => !prv)}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-4"
            >
              share
            </button>
            {shareState && (
              <>
                <TwitterShareButton
                  title={`${data}`}
                  url={"https://twitter.com"}
                >
                  <TwitterIcon
                    size={32}
                    round={true}
                    className="opacity-40 cursor-pointer hover:opacity-100 mx-3"
                  />
                </TwitterShareButton>
                <LinkedinShareButton
                  title={`${data}`}
                  url={"https://www.linkedin.com"}
                >
                  <LinkedinIcon size={32} round={true} />
                </LinkedinShareButton>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Quotes;
