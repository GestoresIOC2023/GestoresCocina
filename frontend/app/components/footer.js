import Image from "next/image";

const Footer = () => {
  return (
    <footer className=" px-4 py-3 flex flex-col gap-2 items-center bg-black text-white">
      <div className="relative w-12 h-12">
        <Image fill src="/logo_white.png" alt="Logo"/>
      </div>
      <ul className="text-center flex gap-3 px-4 items-center">
        <li>
          <a href="/politica-de-cookies">Política de cookies</a>
        </li>
        <li>
          <a href="/politica-de-privacidad">Política de privacidad</a>
        </li>
        <li>
          <a href="/aviso-legal">Aviso legal</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
