import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import ModalCreateBoard from "../modal/ModalCreateBoard";

export default function CardBoardEmpty({ createBoardAction, Workspaceid }) {
  return (
    <ModalCreateBoard
     
      Workspaceid={Workspaceid}
      createBoardAction={createBoardAction}
    />
  );
}
