const Footer = () => {
  return (
    <footer className="bg-[#502918] text-white relative">
      <div className="lg:flex">
        <div className="bg-[#FF6724] lg:w-1/4 lg:ml-8 -mt-16 rounded-t-lg p-6">
          <img src="/logo_white.png" alt="Logo" className="w-48 mx-auto" />
        </div>
        <div className="lg:w-3/4 p-6 mt-5">
          <div className="text-center mt-4">
            <div className="flex justify-center items-center mb-4">
              <div className="mr-4">
                <img src="/icon_twitter.png" alt="Twitter" className="w-8" />
              </div>
              <div className="mr-4">
                <img src="/icon_fb.png" alt="Facebook" className="w-8" />
              </div>
              <div>
                <img src="/icon_instagram.png" alt="Instagram" className="w-8" />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <a href="/politica-de-cookies" className="mr-4">Política de cookies</a>
              <a href="/politica-de-privacidad" className="mr-4">Política de privacidad</a>
              <a href="/aviso-legal">Aviso legal</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;