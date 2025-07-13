import { useEffect, useMemo, useState } from "react";

export type UseClientsOptions = {
  usherUrl: string;
};

export type Client = {
  id: string;
  url: string;
  name: string;
  alwaysShow: boolean;
  logoUrl: string | null;
};

// Creates a temporary iframe, waits for a postMessage from it and sets a state variable to the received data
export const useClients = ({ usherUrl }: UseClientsOptions) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState<string | null>(null);
  const embedUrl = useMemo(() => new URL("/embed", usherUrl), [usherUrl]);

  useEffect(() => {
    const iframe = document.createElement("iframe");
    iframe.src = embedUrl.toString();
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== embedUrl.origin) return;
      if (!("type" in event.data)) return;
      if (!event.data.type.startsWith("usher-")) return;

      iframe.remove();

      if (event.data.type === "usher-clients") {
        setClients(event.data.data);
      } else if (event.data.type === "usher-error") {
        console.error("Received error from Usher iframe:", event.data.error);
        setError(event.data.error);
      } else {
        console.log("Received unknown message type:", event.data.type);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      iframe.remove();
    };
  }, [embedUrl]);

  return { clients, error };
};
