import React, { useState } from "react";
import PageSheet from "../../../../components/common/page-sheet";
import PageTitle from "../../../../components/common/title";
import Button from "../../../../components/buttons/button";
import Prompt from "../../../../components/modals/prompt";
import { useAcademicSession } from "../../../../hooks/useAcademicSession";
import AuthSelect from "../../../../components/inputs/auth-select";
import { useForm } from "react-formid";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Input,
} from "reactstrap";
import { usePreSchool } from "../../../../hooks/usePreSchool";
import ButtonGroup from "../../../../components/buttons/button-group";
import { Link, useNavigate } from "react-router-dom";

const SubjectsByPreSchool = () => {
  const [showSubjects, setShowSubjects] = useState(false);
  const [periodPrompt, setPeriodPrompt] = useState(false);
  const [openAccordion, setOpenAccordion] = useState("0");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const navigate = useNavigate();

  const toggleAccordion = (id) => {
    if (openAccordion === id) {
      setOpenAccordion();
    } else {
      setOpenAccordion(id);
    }
  };

  const onSelect = (subject, topic) => {
    const findSubject = selectedSubjects?.find(
      (item) => item.subject === subject
    );

    if (!findSubject) {
      return setSelectedSubjects([
        ...selectedSubjects,
        { subject, topic: [{ name: topic }] },
      ]);
    }

    const topicExists = findSubject.topic?.some((t) => t.name === topic);

    const newSubject = {
      ...findSubject,
      topic: topicExists
        ? findSubject.topic.filter((t) => t.name !== topic)
        : [...findSubject.topic, { name: topic }],
    };
    const format = selectedSubjects.map((s) => {
      if (s.subject === newSubject.subject) return newSubject;
      return s;
    });

    setSelectedSubjects(format);
  };

  const isChecked = (subject, topic) => {
    return selectedSubjects?.some(
      (item) =>
        item.subject === subject && item.topic?.some((t) => t.name === topic)
    );
  };

  const {
    setPeriod,
    preSchoolSubjects,
    isLoading,
    preSchool,
    postSubjectsByPreSchool,
  } = usePreSchool();

  const {
    handleChange: handlePeriodChange,
    inputs: periodInputs,
    errors: periodErrors,
    handleSubmit: handlePeriodSubmit,
  } = useForm({
    defaultValues: {
      period: "First Half",
      session: "",
      term: "First Term",
    },
    validation: {
      period: {
        required: true,
      },
      session: {
        required: true,
      },
      term: {
        required: true,
      },
    },
  });

  const { isLoading: loadingSessions, data: sessions } = useAcademicSession();

  const onPeriodSubmit = (data) => {
    setShowSubjects(true);
    setPeriodPrompt(false);
    setPeriod(data);
  };
  const onSave = () => {
    postSubjectsByPreSchool({
      ...periodInputs,
      class_id: preSchool?.id,
      class: preSchool?.name,
      subjects: selectedSubjects,
    });
  };

  return (
    <PageSheet>
      <PageTitle>{preSchool?.name} Subjects</PageTitle>
      <div className={`mt-3 mb-5`}>
        <Button onClick={() => setPeriodPrompt(true)}>Enter Period</Button>
      </div>
      {showSubjects && (
        <div>
          {!preSchoolSubjects?.length && !isLoading ? (
            <p className="text-center">
              No data to display. Please create subjects{" "}
              <Link to="/app/pre-school/subjects/new">here.</Link>
            </p>
          ) : null}
          <Accordion open={openAccordion} toggle={toggleAccordion}>
            {preSchoolSubjects?.map((item, index) => (
              <AccordionItem key={item.id}>
                <AccordionHeader targetId={String(index)}>
                  {item.subject}
                </AccordionHeader>
                <AccordionBody accordionId={String(index)}>
                  <div className="py-3">
                    {item?.topic?.map((t) => (
                      <div
                        className="mb-4 d-flex gap-4 align-items-center"
                        key={t.name}
                      >
                        <Input
                          type="checkbox"
                          className="m-0"
                          checked={isChecked(item.subject, t.name)}
                          onChange={() => onSelect(item.subject, t.name)}
                        />
                        <p>{t.name}</p>
                      </div>
                    ))}
                  </div>
                </AccordionBody>
              </AccordionItem>
            ))}
          </Accordion>
          {!!preSchoolSubjects?.length && (
            <div className="mb-5 mt-3 d-flex justify-content-end">
              <ButtonGroup
                options={[
                  {
                    title: "Cancel",
                    type: "button",
                    variant: "outline",
                    onClick: () => navigate(-1),
                  },
                  {
                    title: "Save",
                    type: "button",
                    onClick: onSave,
                    isLoading,
                    disabled: isLoading,
                  },
                ]}
              />
            </div>
          )}
        </div>
      )}
      <Prompt
        isOpen={periodPrompt}
        toggle={() => setPeriodPrompt(false)}
        singleButtonProps={{
          type: "button",
          isLoading: loadingSessions,
          disabled: loadingSessions,
          onClick: handlePeriodSubmit(onPeriodSubmit),
        }}
        singleButtonText="Continue"
        promptHeader="Academic Period"
      >
        <div className="form-group mb-4">
          <AuthSelect
            label="Period"
            value={periodInputs.period}
            name="period"
            hasError={!!periodErrors.period}
            onChange={handlePeriodChange}
            options={[
              { value: "First Half", title: "First Half/Mid Term" },
              { value: "Second Half", title: "Second Half/End of Term" },
            ]}
          />
          {!!periodErrors.period && (
            <p className="error-message">{periodErrors.period}</p>
          )}
        </div>
        <div className="form-group mb-4">
          <AuthSelect
            label="Term"
            value={periodInputs.term}
            name="term"
            hasError={!!periodErrors.term}
            onChange={handlePeriodChange}
            options={[
              { value: "First Term", title: "First Term" },
              { value: "Second Term", title: "Second Term" },
              { value: "Third Term", title: "Third Term" },
            ]}
          />
          {!!periodErrors.term && (
            <p className="error-message">{periodErrors.term}</p>
          )}
        </div>
        <div className="form-group mb-4">
          <AuthSelect
            label="Session"
            value={periodInputs.session}
            name="session"
            hasError={!!periodErrors.session}
            onChange={handlePeriodChange}
            options={(sessions || [])?.map((session) => ({
              value: session?.academic_session,
              title: session?.academic_session,
            }))}
          />
          {!!periodErrors.session && (
            <p className="error-message">{periodErrors.session}</p>
          )}
        </div>
      </Prompt>
    </PageSheet>
  );
};

export default SubjectsByPreSchool;
