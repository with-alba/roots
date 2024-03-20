import { SparklesIcon } from "@heroicons/react/20/solid";
import { Button } from "~/components/ui";
import { BrandButton } from "./_shared/brand-button";
import { IndexQuerySearch } from "./_shared/index-query-search";

export default function Home() {
  return (
    <>
      <div className="flex flex-col place-items-center border-b border-zinc-100 bg-[#FDFDFD] px-4 py-[72px]">
        <div className="w-full max-w-lg space-y-11">
          <svg
            className="mx-auto"
            fill="none"
            height="67"
            viewBox="0 0 72 67"
            width="72"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M36.2197 42.0571L12.0734 64L0.219727 44.3429L21.2929 36.1143L0.219727 28.8L12.0734 8.22857L28.3173 21.4857L24.8051 0H47.6344L44.1222 21.4857L60.3661 8.22857L71.7807 28.8L50.7075 36.1143L71.3417 44.8L59.927 64L36.2197 42.0571Z"
              fill="#18181B"
            />
            <path
              d="M36.5389 50.5263L19.856 66.0692H53.2218L36.5389 50.5263Z"
              fill="#18181B"
            />
          </svg>

          <div className="space-y-2">
            <BrandButton className="w-full justify-center" />
            <IndexQuerySearch />
          </div>
        </div>
      </div>
      <div className="grid h-full w-full place-content-center px-4">
        <div className="grid max-w-[640px] place-items-center space-y-4 text-center">
          <div className="space-y-2">
            <SparklesIcon className="mx-auto size-[42px] text-placeholder" />
            <p className="text-[20px] font-medium">
              Estamos trabajando en ello
            </p>
          </div>
          <p className="text-pretty">
            En Artifact estamos siempre trabajando para que tu experiencia sea
            la mejor posible. Aqui encontraras tu historial de busqueda,
            recomendaciones y mas!
          </p>
          <Button className="max-w-fit" variant="secondary">
            Ver codigo en GitHub
          </Button>
        </div>
      </div>
    </>
  );
}
