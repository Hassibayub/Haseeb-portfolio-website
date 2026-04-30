interface IncludedListProps {
  items: string[];
}

export function IncludedList({ items }: IncludedListProps) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-4">
          <span
            aria-hidden
            className="mt-[9px] shrink-0"
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              backgroundColor: '#D8F9B8',
            }}
          />
          <span
            className="text-[16px] leading-[1.65]"
            style={{ color: '#1D2020' }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
