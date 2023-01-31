export const ENDPOINTURL = "http://localhost:8080/api/v1"; // "http://localhost:8080/api/v1";
export const ENDPOINTURLFORIMG = "http://localhost:8080/"; //  "http://localhost:8080/";

export const listBody = (data) => {
  return {
    where: data.where,
    pagination: {
      sortBy: data.sortBy ? data.sortBy : "createdAt",
      descending: false,
      rowsPerPage: data.perPage ? data.perPage : 10000,
      page: data.page ? data.page : 1,
    },
  };
};

export const delBody = (data) => {
  return {
    data,
  };
};


