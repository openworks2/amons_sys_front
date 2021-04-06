import React from "react";
import ContentSubTitle from "../ContentSubTitle";
import styled from "styled-components";
import { Form, Button } from "semantic-ui-react";

const CompanyInputCompo = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  margin-top: 5px;
  margin-bottom: 18px;

  .company-input-form-body {
    margin-top: 29px;
  }

  .input-form {
    font-family: "NotoSansKR-Regular";
    font-size: 14px;
    text-align: left;
    letter-spacing: 0px;
    color: #929292;
    opacity: 1;
  }

  .input-form.title {
    font-family: "NotoSansKR-Medium";
    font-size: 14px;
    text-align: left;
    letter-spacing: 0px;
    color: #2e2e2e;
    opacity: 1;
  }

  .input-form.description {
    height: 105px !important;
  }
  .submit-button {
    width: 324px;
    height: 50px;
    background-color: #f1592f;
    border: 1px solid #d8d8d8;
    opacity: 1;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
    margin-top: 400px;
  }
`;

const CompanyInput = () => {
  return (
    <CompanyInputCompo className="company-input-compo">
      <ContentSubTitle subTitle="소속사 등록" />
      <Form className="company-input-form-body">
        <Form.Field className="company-input-form co-name">
          <label className="input-form title">소속사</label>
          <input
            className="input-form"
            placeholder="소속사를 입력해 주세요."
            required={true}
          />
        </Form.Field>
        <Form.Field className="company-input-form co-sectors">
          <label className="input-form title">업종</label>
          <input
            className="input-form"
            placeholder="업종을 입력해 주세요."
            required={true}
          />
        </Form.Field>
        <Form.Field className="company-input-form description">
          <label className="input-form title">비고</label>
          <textarea
            className="input-form description"
            placeholder="비고 입력란"
          />
        </Form.Field>
        {/* 테이블 로우 클릭했으면 등록이 아니라 수정으로 할 수 있게 삼항연산자 쓸 것 */}
        <Button className="submit-button" type="submit">
          등록
        </Button>
      </Form>
    </CompanyInputCompo>
  );
};

export default CompanyInput;
