import { ReactElement } from "react";
import { FlashList } from "@shopify/flash-list";
import { AnyNote } from "@/types";

interface Props<T extends AnyNote> {
  data: T[];
  renderItem: (item: T) => ReactElement;
  empty: ReactElement;
}

export function ContentList<T extends AnyNote>({ data, renderItem, empty }: Props<T>) {
  if (!data.length) {
    return empty;
  }

  return (
    <FlashList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => renderItem(item)}
      showsVerticalScrollIndicator={false}
    />
  );
}
