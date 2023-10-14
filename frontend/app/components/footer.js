const Footer = () => {
    return (
        <footer className="bg-black text-white p-6">
        <div className="text-center">
          <img src="/logo_white.png" alt="Logo" className="w-48 mx-auto" />
        </div>
        <ul className="text-center mt-4">
          <li className="inline-block mx-4">
            <a href="/politica-de-cookies">Política de cookies</a>
          </li>
          <li className="inline-block mx-4">
            <a href="/politica-de-privacidad">Política de privacidad</a>
          </li>
          <li className="inline-block mx-4">
            <a href="/aviso-legal">Aviso legal</a>
          </li>
        </ul>
      </footer>
    )
};

export default Footer;