import { BiPaperPlane } from "react-icons/bi";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { sendMailer } from "../services/sendmailer";
import { DataMenssagemsTypes } from "../types/sendmailer";

export const FormularioContatos = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [message, setMessage] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const data: DataMenssagemsTypes = {
      name: `${name}`,
      email: `${email}`,
      mensssagem: `${message}`,
    };

    await sendMailer(data)
      .then((res) => {
        console.log("respostas:" + res);
      })
      .catch((err) => {
        console.error(`${err?.statusCode}` + err);
      });
  }

  return (
    <div className="flex justify-center items-center w-full  px-2">
      <form
        method="post"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flex justify-start  flex-col text-stone-50 items-center w-full max-w-md  md:max-w-xl lg:max-w-md px-6 py-10 vidro bg-stone-700  border border-stone-700  rounded-xl shadow-2xl "
      >
        <div className="mt-2 w-full text-left">
          <label className="block pl-4 font-semibold ">
            Nome <span className="text-red-500">*</span>{" "}
          </label>
          <input
            name="Name"
            type="text"
            placeholder="Seu nome"
            id="name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            autoComplete="off"
            className="appearance-none block w-full bg-stone-200 px-6 text-stone-800 py-2 border-neutral-700 rounded-full shadow-sm placeholder-gray-700 focus:outline-none focus:ring-secondy-blue focus:border-primary-blue-450 dark:bg-zinc-600"
          />
        </div>
        <div className="mt-4 w-full text-left">
          <label className="block pl-4 font-semibold ">
            E-mail <span className="text-red-500">*</span>
          </label>

          <input
            name="Email"
            type="text"
            placeholder="Seu email"
            id="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoComplete="off"
            className="appearance-none block w-full bg-stone-200 px-6 text-stone-800 py-2 border-neutral-700 rounded-full shadow-sm placeholder-gray-700 focus:outline-none focus:ring-secondy-blue focus:border-primary-blue-450 dark:bg-zinc-600"
          />
        </div>

        <div className="mt-6 w-full text-left">
          <label className="block pl-4 font-semibold ">
            Mensagem <span className="text-red-500">*</span>
          </label>

          <textarea
            name="Name"
            placeholder="Sua mensagem"
            autoComplete="off"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className="appearance-none block w-full bg-stone-300 px-6 text-stone-800 py-2 border-neutral-700 rounded-xl shadow-sm placeholder-gray-700 focus:outline-none focus:ring-secondy-blue focus:border-primary-blue-450 dark:bg-zinc-600"
          />
        </div>

        <div
          id="mensagem"
          className="flex pt-6 px-2 justify-center items-center w-full"
        >
          <button
            type="submit"
            className="flex justify-center items-center bg-primary border-2 border-green-600  w-full text-base font-bold  custom-btn btn-11 py-2 text-neutral-100  rounded-full hover:bg-green-900 hover:bg-opacity-10 back-drop-blur-sm fo hover:text-green-400  hover:scale-105 transition-all duration-300 ease-in-out "
            name="Garanta seu teste gratis"
            disabled={isLoading ? true : false}
          >
            {isLoading == true ? (
              <ClipLoader color="#fbfbfb" size={20} />
            ) : (
              <>
                <BiPaperPlane className="inline mr-2" />
                <span>Enviar mensagem!</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
