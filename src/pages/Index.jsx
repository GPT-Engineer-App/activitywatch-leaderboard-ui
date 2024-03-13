import React, { useState } from "react";
import { Box, Input, Table, Thead, Tbody, Tr, Th, Td, Flex, Select, Button, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, FormControl, FormLabel, Switch, DrawerCloseButton, Tabs, TabList, TabPanels, Tab, TabPanel, VStack, Heading, Text, useToast } from "@chakra-ui/react";
import { FaSync, FaSearch, FaUser, FaCog } from "react-icons/fa";

// Mock data for leaderboard
const mockLeaderboardData = [
  { rank: 1, name: "User123", productiveTime: "5h 30m", category: "Coding" },
  { rank: 2, name: "User456", productiveTime: "4h 45m", category: "Reading" },
  // ... more users
];

// Mock data for user stats
const mockUserStats = {
  productiveTime: "40h",
  mostProductiveCategory: "Coding",
  // ... more stats
};

const Index = () => {
  const [leaderboardData, setLeaderboardData] = useState(mockLeaderboardData);
  const [userStats, setUserStats] = useState(mockUserStats);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSync = () => {
    // Mock sync action
    toast({
      title: "Data sync initiated.",
      description: "Your data is being synchronized.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const renderLeaderboardTable = () => (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th isNumeric>Rank</Th>
          <Th>Name</Th>
          <Th isNumeric>Productive Time</Th>
          <Th>Category</Th>
        </Tr>
      </Thead>
      <Tbody>
        {leaderboardData.map((user) => (
          <Tr key={user.rank}>
            <Td isNumeric>{user.rank}</Td>
            <Td>{user.name}</Td>
            <Td isNumeric>{user.productiveTime}</Td>
            <Td>{user.category}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );

  return (
    <Box>
      <Flex justifyContent="space-between" p={4}>
        <Input placeholder="Search leaderboard" mr={2} />
        <Button leftIcon={<FaSearch />} colorScheme="teal">
          Search
        </Button>
        <Button onClick={onOpen} ml={2} colorScheme="blue">
          Menu
        </Button>
      </Flex>

      <Flex direction="column" p={4}>
        <Heading size="lg">Leaderboard</Heading>
        <Select placeholder="Select time frame" my={4}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </Select>
        {renderLeaderboardTable()}
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>
                  <FaUser /> Profile
                </Tab>
                <Tab>
                  <FaCog /> Settings
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <Box>
                      <Heading size="md">Your Stats</Heading>
                      <Text>Productive Time: {userStats.productiveTime}</Text>
                      <Text>Most Productive Category: {userStats.mostProductiveCategory}</Text>
                    </Box>
                    <Box>
                      <Heading size="md">Privacy Settings</Heading>
                      <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="privacy-toggle" mb="0">
                          Anonymize Profile
                        </FormLabel>
                        <Switch id="privacy-toggle" />
                      </FormControl>
                    </Box>
                    <Button leftIcon={<FaSync />} colorScheme="blue" onClick={handleSync}>
                      Sync Data
                    </Button>
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    {/* Settings placeholders */}
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Index;
