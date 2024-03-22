import { Trigger, Value } from "@radix-ui/react-select";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Select, buttonVariants } from "~/components/ui";
import { sorting } from "~/lib/mappings/sorting";
import { useSearchPageSearchParams } from "../context";

export function PropertiesSort() {
  const [searchParams, setSearchParams] = useSearchPageSearchParams();

  const value = searchParams.sort;
  return (
    <Select.Root
      onValueChange={(val) => {
        setSearchParams((prev) => ({
          ...prev,
          sort: val as "price_asc" | "price_desc",
          page: 1,
        }));
      }}
      value={value}
    >
      <Trigger
        className={buttonVariants().base({
          variant: "secondary",
        })}
      >
        <Value placeholder="Ordenar por" />
        <ChevronDownIcon className="h-5 w-5 text-zinc-600" />
      </Trigger>
      <Select.Content>
        {sorting.map(({ id, name }) => {
          return (
            <Select.Item key={id} value={id}>
              {name}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
}
