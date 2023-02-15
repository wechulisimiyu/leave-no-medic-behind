const React = require("react");
const styled = require("styled-components");

const { Box, H2, Text } = require("@adminjs/design-system");
const { useTranslation } = require("adminjs");

const pageHeaderHeight = 284;
const pageHeaderPaddingY = 74;
const pageHeaderPaddingX = 250;

const DashboardHeader = () => {
  const { translateMessage } = useTranslation();
  return (
    <Box position="relative" overflow="hidden">
      <Box
        position="absolute"
        top={50}
        left={-10}
        opacity={[0.2, 0.4, 1]}
      >
        <Illustration variant="Rocket" />
      </Box>
      <Box
        position="absolute"
        top={-70}
        right={-15}
        opacity={[0.2, 0.4, 1]}
      >
        <Illustration variant="Moon" />
      </Box>
      <Box
        bg="grey100"
        height={pageHeaderHeight}
        paddingTop={pageHeaderPaddingY}
        paddingX={[0, 0, pageHeaderPaddingX]}
      >
        <Text textAlign="center" color="white">
          <H2>{translateMessage("welcomeOnBoard_title")}</H2>
          <Text opacity={0.8}>
            {translateMessage("welcomeOnBoard_subtitle")}
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

const boxes = ({ translateMessage }) => [
  {
    variant: "Planet",
    title: translateMessage("addingResources_title"),
    subtitle: translateMessage("addingResources_subtitle"),
    href: "https://adminjs.co/tutorial-passing-resources.html"
  },
  {
    variant: "DocumentCheck",
    title: translateMessage("customizeResources_title"),
    subtitle: translateMessage("customizeResources_subtitle"),
    href: "https://adminjs.co/tutorial-customizing-resources.html"
  },
  {
    variant: "DocumentSearch",
    title: translateMessage("customizeActions_title"),
    subtitle: translateMessage("customizeActions_subtitle"),
    href: "https://adminjs.co/tutorial-actions.html"
  },
  {
    variant: "FlagInCog",
    title: translateMessage("writeOwnComponents_title"),
    subtitle: translateMessage("writeOwnComponents_subtitle"),
    href: "https://adminjs.co/tutorial-writing-react-components.html"
  },
  {
    variant: "Folders",
    title: translateMessage("customDashboard_title"),
    subtitle: translateMessage("customDashboard_subtitle"),
    href: "https://adminjs.co/tutorial-custom-dashboard.html"
  },
  {
    variant: "Astronaut",
    title: translateMessage("roleBasedAccess_title"),
    subtitle: translateMessage("roleBasedAccess_subtitle"),
    href: "https://adminjs.co/tutorial-rbac.html"
  }
];

const Dashboard = () => {
  const { translateMessage, translateButton } = useTranslation();
  return (
    <Box>
      <DashboardHeader />
      <Box
        mt={["xl", "xl", "-100px"]}
        mb="xl"
        mx={[0, 0, 0, "auto"]}
        px={["default", "lg", "xxl", "0"]}
        position="relative"
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        width={[1, 1, 1, 1024]}
      >
        {boxes({ translateMessage }).map((box, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={index} width={[1, 1 / 2, 1 / 3, 1 / 3]} p="default">
            <Card
              as="a"
              href={box.href}
              p="default"
              height="100%"
              flex
              alignItems="center"
              justifyContent="center"
            >
              <Illustration variant={box.variant} />
              <Box p="lg">
                <H5>{box.title}</H5>
                <Text opacity={0.7}>{box.subtitle}</Text>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
      <Box textAlign="center" p="lg">
        <Button variant="primary">{translateButton('discoverAdminJs')}</Button>
      </Box>
    </Box>
  );
};

module.exports = Dashboard