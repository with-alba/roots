import type { Property } from "~/types/property";

interface PropertyAttributesModalContentProps {
  attributes: Property["attributes"];
}

export const PropertyAttributesModalContent = ({
  attributes,
}: PropertyAttributesModalContentProps) => {
  // Group the attributes by group
  const groupedAttributes = attributes.reduce<
    Record<string, Property["attributes"]>
  >((acc, attribute) => {
    if (!(attribute.group in acc)) {
      acc[attribute.group] = [];
    }

    acc[attribute.group].push(attribute);
    return acc;
  }, {});

  // Sort the groups. The "Principales" group should be first, then the rest of the groups. Then render.
  return Object.entries(groupedAttributes)
    .toSorted((a, b) => {
      if (a[0] === "Principales") return -1;
      if (b[0] === "Principales") return 1;

      return 0;
    })
    .map(([group, attrbutes]) => {
      return (
        <div className="space-y-2" key={group}>
          <p className="font-medium">{group}</p>
          <ul>
            {attrbutes.map((attr) => {
              return (
                <li
                  className="flex items-center justify-between border-zinc-100 py-2 text-[15px] font-medium [&:not(:last-child)]:border-b"
                  key={attr.id}
                >
                  <p className="text-secondary">{attr.name}</p>
                  <p>{attr.value}</p>
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
};
