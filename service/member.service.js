import { memberRouteGroup } from "@/routes/memberRoute";


export const getAllMembersByBoardIdService = async (boardId) => { 
    const url = `${memberRouteGroup.getAllMembersByBoardId(boardId)}`;
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ6ZW50cmlva3NocmRAZ21haWwuY29tIiwiaWF0IjoxNzQ5MDI0OTgwLCJleHAiOjE3NDkwNDY1ODB9.QbDisYblvbwmtT55-zAJnnv6mjDtGI11a9OR0HiKC0ey8oiG5beL1HbnuXHoSjvrpvsIn58G36nZfWnNa1pA4A";
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data;
}