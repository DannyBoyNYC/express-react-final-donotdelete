const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

async function fetchData({ path, method, data, headers }) {
  const response = await fetch(path, {
    method: method,
    body: !!data ? JSON.stringify(data) : null,
    headers: !!headers ? headers : defaultHeaders,
  }).then((response) => response.json());
  return response;
}

export function useApi() {
  return {
    get: (path, headers) =>
      fetchData({
        path: path,
        method: "GET",
        data: null,
        headers: headers,
      }),
    post: (path, data, headers) =>
      fetchData({
        path: path,
        method: "POST",
        data: data,
        headers: headers,
      }),
    put: (path, data, headers) =>
      fetchData({
        path: path,
        method: "PUT",
        data: data,
        headers: headers,
      }),
    del: (path, headers) =>
      fetchData({
        path: path,
        method: "DELETE",
        data: null,
        headers: headers,
      }),
  };
}

export default useApi;
