import { Popover } from "@base-ui-components/react/popover";
import { LayoutGridIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { usePreloadImages } from "../../lib/preload.js";
import { Button } from "../button/button.js";
import { useClients } from "./usher.js";

type RenderProp = ComponentProps<typeof Popover.Trigger>["render"];

type Props = {
  children?: RenderProp;
  referrer: string;
  usherUrl: string;
};

const FALLBACK_LOGO_URL =
  "https://cdn.scouterna.net/jamboree26/images/app-placeholder.png";

function AppWaffle({ children, referrer, usherUrl }: Props) {
  const { clients, error } = useClients({ usherUrl });

  const imageUrls = clients.map(
    (client) => client.logoUrl ?? FALLBACK_LOGO_URL,
  );
  usePreloadImages(imageUrls);

  const clientsWithReferrer = clients.map((client) => {
    const url = new URL(client.url);
    url.searchParams.set("referrer", referrer);

    return {
      ...client,
      url: url.toString(),
    };
  });

  children = children ?? (
    <Button size="medium-icon" variant="text" aria-label="Change app">
      <LayoutGridIcon />
    </Button>
  );

  return (
    <Popover.Root>
      <Popover.Trigger render={children} />
      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup className="origin-[var(--transform-origin)] rounded-lg bg-[canvas] p-4 text-gray-900 shadow outline outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
            <Popover.Arrow className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180">
              <ArrowSvg />
            </Popover.Arrow>
            {error ? (
              <div>Something went wrong while loading your apps.</div>
            ) : (
              <div className="grid grid-cols-3 gap-2 grid-flow-row-dense">
                {clientsWithReferrer.map((client) => (
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={client.id}
                    className="relative size-20"
                  >
                    <div
                      className={`
                      group/app-card
                      absolute w-full h-full min-h-full rounded-lg pt-3 pb-1 px-1 flex flex-col items-center
                      hover:h-auto hover:bg-gray-100/80
                      select-none
                    `}
                    >
                      <img
                        src={client.logoUrl ?? FALLBACK_LOGO_URL}
                        alt={client.name}
                        className="size-9 aspect-square object-cover rounded-sm"
                      />
                      <span
                        className={`
                        text-sm text-center mt-1 overflow-ellipsis line-clamp-1
                        group-hover/app-card:line-clamp-none
                      `}
                      >
                        {client.name}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

function ArrowSvg(props: React.ComponentProps<"svg">) {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: This is only for display
    <svg
      width="20"
      height="10"
      viewBox="0 0 20 10"
      fill="none"
      {...props}
      aria-hidden
    >
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-[canvas]"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className="fill-gray-200"
      />
    </svg>
  );
}

export { AppWaffle };
