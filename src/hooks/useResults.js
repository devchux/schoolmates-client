import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { useReactToPrint } from "react-to-print";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useResults = () => {
  const { apiServices, errorHandler, permission } = useAppContext("results");
  const [openPrompt, setOpenPrompt] = useState(false);
  const [selectedComment, setSelectedComment] = useState("");
  const [teacherComment, setTeacherComment] = useState("");
  const [hosComment, setHosComment] = useState("");
  const [comment, setComment] = useState("teacher");
  const pdfExportComponent = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => pdfExportComponent.current,
  });

  const { data: academicDate, isLoading: academicDateLoading } = useQuery(
    [queryKeys.GET_ACADEMIC_DATE],
    apiServices.getResumptionDate,
    {
      onError(err) {
        errorHandler(err);
      },
      select: (data) => data?.data[0]?.attributes,
    }
  );

  const { data: maxScores, isLoading: maxScoresLoading } = useQuery(
    [queryKeys.GET_MAX_SCORES],
    apiServices.getMaxScores,
    {
      onError(err) {
        errorHandler(err);
      },
      select: (data) => data?.data[0]?.attributes,
    }
  );

  const isLoading = academicDateLoading || maxScoresLoading;

  return {
    isLoading,
    academicDate,
    permission,
    openPrompt,
    setOpenPrompt,
    selectedComment,
    setSelectedComment,
    teacherComment,
    setTeacherComment,
    hosComment,
    setHosComment,
    comment,
    setComment,
    maxScores,
    pdfExportComponent,
    handlePrint,
  };
};
