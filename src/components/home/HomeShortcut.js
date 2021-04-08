import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardCompo = styled.div`
  padding-top: 70px;
  padding-left: 280px !important;
  width: 100%;
  height: 100%;
  background: #c5c9cf 0% 0% no-repeat padding-box;
  opacity: 1;

  .card-component {
    top: 280px;
    left: 50px;
    width: 230px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 1px 2px 6px #0e05094d;
    border-radius: 0px 0px 4px 4px;
    opacity: 1;
    display: inline-block;
    margin: 34px;
  }
  .a.ui.card:hover {
    top: 280px;
    left: 50px;
    width: 230px;
    background: #000000 0% 0% no-repeat padding-box !important;
    border-radius: 4px 4px 0px 0px;
    opacity: 0.8;
    opacity: 1;
    display: inline-block;
    margin: 34px;
  }

  .img-box {
    width: 230px;
    height: 237px;
    line-height: 237px;
    text-align: center;
    background: #2e2e2e 0% 0% no-repeat padding-box;
    border-radius: 4px 4px 0px 0px;
    opacity: 1;
  }
  .card-img {
    margin: auto;
    vertical-align: middle;
    width: 123px;
    height: 162px;
    margin-left: 15px;
  }

  .card-img.monitoring {
    width: 165px;
    height: 140px;
    margin-left: 0px;
  }

  .card-title {
    width: 230px;
    height: 79px;
    padding-top: 27px !important;
    font-family: "NotoSansKR-Medium" !important;
    font-size: 20px !important;
    text-align: center !important;
    vertical-align: middle !important;
    justify-content: center !important;
    color: #2e2e2e;
    opacity: 0.87;
  }
`;

const HomeShortcut = () => {
  return (
    <CardCompo>
      <Card as={Link} to="" className="card-component">
        <div className="img-box">
          <Image
            src="/main/monitoring.png"
            className="card-img monitoring"
            wrapped={false}
          />
        </div>
        <Card.Content className="card-title">모니터링</Card.Content>
      </Card>
      <Card as={Link} to="" className="card-component">
        <div className="img-box">
          <Image src="/main/sos.png" className="card-img " wrapped={false} />
        </div>
        <Card.Content className="card-title">알람이력 : 작업자</Card.Content>
      </Card>
      <Card as={Link} to="" className="card-component">
        <div className="img-box">
          <Image src="/main/worker.png" className="card-img " wrapped={false} />
        </div>
        <Card.Content className="card-title">
          막장잔류이력 : 작업자
        </Card.Content>
      </Card>
      <Card as={Link} to="" className="card-component">
        <div className="img-box">
          <Image
            src="/main/vehicle.png"
            className="card-img "
            wrapped={false}
          />
        </div>
        <Card.Content className="card-title">막장잔류이력 : 차량</Card.Content>
      </Card>
      <Card as={Link} to="" className="card-component">
        <div className="img-box">
          <Image src="/main/drill.png" className="card-img " wrapped={false} />
        </div>
        <Card.Content className="card-title">굴진이력</Card.Content>
      </Card>
    </CardCompo>
  );
};

export default HomeShortcut;
