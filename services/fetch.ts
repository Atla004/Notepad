import { fetchData } from "./localstorage";
import { FetchParams } from "@/types/fetch";

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL as string;

export const wrappedFetch = async (params: FetchParams) => {
  const { route, method, body, headers } = params;
  const url = `${backendUrl}${route}`;
  const request: RequestInit = { method };
  request.body = body ? JSON.stringify(body) : "";

  request.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...headers,
  };
  console.log("fetch: ", JSON.stringify(request, null, 2));

  return await fetch(url, { ...request });
};

export const authorizedWrappedFetch = async (params: FetchParams) => {
  try {
    const token = await fetchData("jwtoken");
    const newParams: FetchParams = {
      route: params.route,
      method: params.method,
      headers: {
        ...params.headers,
        Authorization: `Bearer ${token}`,
      },
    };

    if (params.body) newParams.body = params.body;
    return await wrappedFetch(newParams);
  } catch (error) {
    console.error("authorizedWrappedFetch error", (error as Error).message);
  }
};
