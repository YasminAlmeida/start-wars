import React from "react";
import { Card, Col, Divider, Flex, Image, Row, Typography } from "antd";
import Poster from "../assets/images/poster-article-feature-3.jpg";
import Poster2 from "../assets/images/poster-article-feature-2.jpg";
import Poster3 from "../assets/images/poster-article-feature.jpg";

import { ThemeType } from "../theme";
import { Themes } from "../types/theme";

interface IHomeProps {
  theme: Themes[ThemeType]["token"];
}

export const Home: React.FC<IHomeProps> = ({ theme }) => {
  return (
    <Flex vertical>
      <Typography.Title
        style={{
          color: theme.colorTextTitle,
        }}
        level={5}
      >
        Acompanhe
      </Typography.Title>
      <Typography.Text
        style={{
          color: theme.colorTextSubtitle,
        }}
      >
        Verifique as últimas notícias e atualizações sobre a comunidade
      </Typography.Text>
      <Divider
        orientation="right"
        plain
        style={{
          color: theme.colorTextTitle,
        }}
      >
        Site Oficial
      </Divider>
      <Typography.Text
        style={{
          marginBottom: 16,
          color: theme.colorTextSubtitle,
        }}
      >
        Para encontar mais informações sobre a comunidade, acesse o site oficial
        em <Typography.Link>https://www.starwars.com/</Typography.Link>
      </Typography.Text>
      <Flex wrap gap="25px" vertical justify="space-between">
        <Card hoverable style={{ padding: 0 }}>
          <Row
            gutter={16}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Col span={12}>
              <Image src={Poster} width="100%" />
            </Col>
            <Col span={12}>
              <Typography.Paragraph>
                “ Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aliquam lacinia libero odio, sit amet laoreet dolor mollis et.
                Pellentesque quis arcu enim. Ut sit amet nunc augue. Donec
                eleifend et tellus sed accumsan. Sed lobortis venenatis lectus
                non finibus. Maecenas consequat at elit eget fermentum. Aenean
                cursus eros lorem, non vulputate est pharetra id. Nullam vitae
                nulla erat. Vivamus nisi lectus, fringilla sed fermentum at,
                auctor at lacus.”
              </Typography.Paragraph>
            </Col>
          </Row>
        </Card>
        <Card hoverable style={{ padding: 0 }}>
          <Row
            gutter={16}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Col span={12}>
              <Typography.Paragraph>
                “ Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aliquam lacinia libero odio, sit amet laoreet dolor mollis et.
                Pellentesque quis arcu enim. Ut sit amet nunc augue. Donec
                eleifend et tellus sed accumsan. Sed lobortis venenatis lectus
                non finibus.
              </Typography.Paragraph>
            </Col>
            <Col span={12}>
              <Image src={Poster2} width="100%" />
            </Col>
          </Row>
        </Card>
        <Card hoverable style={{ padding: 0 }}>
          <Row
            gutter={16}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Col span={12}>
              <Image src={Poster3} width="100%" />
            </Col>
            <Col span={12}>
              <Typography.Paragraph>
                “ Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aliquam lacinia libero odio, sit amet laoreet dolor mollis et.
                Pellentesque quis arcu enim. Ut sit amet nunc augue. Donec
                eleifend et tellus sed accumsan. Sed lobortis venenatis lectus
                non finibus.
              </Typography.Paragraph>
            </Col>
          </Row>
        </Card>
      </Flex>
    </Flex>
  );
};
