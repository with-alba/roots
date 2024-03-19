import { ViewTabs } from "./_shared/view-tabs";
import { PropertiesSection } from "./_shared/properties-section";
import type { SearchPageSearchParams } from "./_shared/context";
import { SearchPageSearchParamsProvider } from "./_shared/context";
import { FiltersModal } from "./_shared/filters/filters-modal";
import { ShareButton } from "./_shared/share-button";

function SearchPage({
  searchParams,
}: {
  searchParams: SearchPageSearchParams;
}) {
  return (
    <SearchPageSearchParamsProvider value={searchParams}>
      <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
        <div className="flex items-center gap-2">
          <FiltersModal />
        </div>
        <div className="flex items-center gap-3">
          <ShareButton />
          <hr className="h-4 w-px bg-zinc-200 max-sm:hidden" />
          <ViewTabs />
        </div>
      </div>

      <PropertiesSection />
    </SearchPageSearchParamsProvider>
  );
}

export default SearchPage;
