// src/app/components/Loader.js

const Loader = () => {
  return (
    <div className="loader">
      <p>Cargando...</p>
      <style jsx>{`
        .loader {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default Loader;
