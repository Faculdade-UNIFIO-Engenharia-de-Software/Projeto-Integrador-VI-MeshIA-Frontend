  type variantLogo = {
    left: "items-start",
    center: "items-center",
    right:"items-right"
  }

export default function LogoLayout({className, variantLogo="left", ...props}: any) {



  return (
    <div className={`"flex flex-col gap-2 ${variantLogo}, ${className}"`}>
      <img className="h-14 w-auto" src="./logo-icon-nav.png" alt="" />
      <h1 className="text-5xl font-extrabold">
        Mesh<span className="text-[#3EE1B7]">IA</span>
      </h1>
      <p className="font-jetbrains text-1">
        DATA MESH & ENTERPRISE RAG PLATAFORM
      </p>
    </div>
  );
}
