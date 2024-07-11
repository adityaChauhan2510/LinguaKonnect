export const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIwNDFjMjBmMy1lMWFiLTRmM2EtYmQ1ZC1kMGQ0ZmU3ZjMyZGMiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyMDE4MTQ2MCwiZXhwIjoxNzIwNzg2MjYwfQ.F3iRMrt9C0vFF32PpRE-pqxlFQAD9-xh8EWkejdUue4";

export const createNewRoom = async () => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
  });

  const { roomId } = await res.json();
  return roomId;
};
