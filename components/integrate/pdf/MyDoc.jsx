import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 40,
    backgroundColor: "#FFFFFF",
    color: "#1F2937",
  },
  headerContainer: {
    backgroundColor: "#3CB4E6",
    padding: 10,
    borderRadius: 4,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  boardTable: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1, // Add this
    borderColor: "#E5E7EB",
  },
  tableCellHeader: {
    flex: 1,
    backgroundColor: "#3CB4E6",
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    padding: 5,
    borderRightWidth: 1,
    borderColor: "#FFFFFF",
    textAlign: "center",
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    padding: 5,
    borderRightWidth: 1,
    borderColor: "#E5E7EB",
    textAlign: "center",
  },
  lastCell: {
    borderRightWidth: 0, // removes the right border for last cell
  },
  tableContainer: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 20,
  },
  tableHeader: {
    flex: 1,
    backgroundColor: "#3CB4E6",
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    padding: 5,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1F2937",
  },
  blueText: {
    color: "#3CB4E6",
  },
  bodyText: {
    fontSize: 10,
    color: "#374151",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  stageTable: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  stageHeader: {
    flex: 1,
    backgroundColor: "#3CB4E6",
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
    padding: 4,
    borderRightWidth: 1,
    borderColor: "#FFFFFF",
    textAlign: "center",
  },
  stageCell: {
    flex: 1,
    fontSize: 10,
    padding: 4,
    borderRightWidth: 1,
    borderColor: "#E5E7EB",
    textAlign: "center",
  },
  pageFooter: {
    textAlign: "center",
    fontSize: 10,
    marginTop: 20,
  },
});

const MyDocument = () => (
  <Document>
    {/* PAGE 1 */}
    <Page size="A4" style={styles.page}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Reports</Text>
      </View>

      <View style={styles.boardTable}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Board Name</Text>
          <Text style={styles.tableCellHeader}>Task</Text>
          <Text style={styles.tableCellHeader}>Version</Text>
          <Text style={styles.tableCellHeader}>Date</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Hikko Design</Text>
          <Text style={styles.tableCell}>08</Text>
          <Text style={styles.tableCell}>02</Text>
          <Text style={styles.tableCell}>18/05/2025</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        I. Gantt Bar in <Text style={styles.blueText}>Hikko Design</Text>
      </Text>
      <Image style={styles.image} src=".../../../assets/MacBook-Pro-16.png" />

      <Text style={styles.sectionTitle}>II. Stages Information</Text>
      <Text style={styles.bodyText}>
        This section provides a structured overview of the project's workflow
        distribution across four stages: To Do, Progress, Under Review, and
        Completed.
      </Text>
      <View style={styles.stageTable}>
        <View style={styles.tableRow}>
          <Text style={styles.stageHeader}>Stage</Text>
          <Text style={styles.stageHeader}>Tasks</Text>
          <Text style={styles.stageHeader}>Checklists</Text>
        </View>
        {[
          { stage: "To Do", tasks: "10 tasks", checklists: "10 checklists" },
          { stage: "Progress", tasks: "8 tasks", checklists: "5 checklists" },
          {
            stage: "Under Review",
            tasks: "5 tasks",
            checklists: "7 checklists",
          },
          { stage: "Completed", tasks: "3 tasks", checklists: "6 checklists" },
        ].map((row, i) => (
          <View key={i} style={styles.tableRow}>
            <Text style={styles.stageCell}>{row.stage}</Text>
            <Text style={styles.stageCell}>{row.tasks}</Text>
            <Text style={styles.stageCell}>{row.checklists}</Text>
          </View>
        ))}
      </View>
    </Page>

    {/* PAGE 2 */}
    <Page size="A4" style={styles.page}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Reports</Text>
      </View>

      <Text style={styles.sectionTitle}>III. To Do information</Text>
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Task Title</Text>
          <Text style={styles.tableHeader}>Lead</Text>
          <Text style={styles.tableHeader}>Subtask Count</Text>
        </View>
        {[
          { title: "Setup project repo", lead: "Alice", count: "1" },
          { title: "Design UI", lead: "Bob", count: "2" },
          { title: "API Development", lead: "Charlie", count: "1" },
          { title: "Requirement gathering", lead: "David", count: "1" },
        ].map((row, i) => (
          <View style={styles.tableRow} key={i}>
            <Text style={styles.tableCell}>{row.title}</Text>
            <Text style={styles.tableCell}>{row.lead}</Text>
            <Text style={[styles.tableCell, styles.lastCell]}>{row.count}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>IV. Under Review information</Text>
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Task Title</Text>
          <Text style={styles.tableHeader}>Lead</Text>
          <Text style={styles.tableHeader}>Subtask Count</Text>
        </View>
        {[
          { title: "Setup CI/CD", lead: "Bob", count: "2" },
          { title: "Frontend Dev", lead: "Alice", count: "1" },
        ].map((row, i) => (
          <View style={styles.tableRow} key={i}>
            <Text style={styles.tableCell}>{row.title}</Text>
            <Text style={styles.tableCell}>{row.lead}</Text>
            <Text style={[styles.tableCell, styles.lastCell]}>{row.count}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>V. Progress information</Text>
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Task Title</Text>
          <Text style={styles.tableHeader}>Lead</Text>
          <Text style={styles.tableHeader}>Subtask Count</Text>
        </View>
        {[{ title: "QA Testing", lead: "Charlie", count: "2" }].map(
          (row, i) => (
            <View style={styles.tableRow} key={i}>
              <Text style={styles.tableCell}>{row.title}</Text>
              <Text style={styles.tableCell}>{row.lead}</Text>
              <Text style={[styles.tableCell, styles.lastCell]}>
                {row.count}
              </Text>
            </View>
          )
        )}
      </View>

      <Text style={styles.pageFooter}>page 2</Text>
    </Page>

    {/* PAGE 3 */}
    <Page size="A4" style={styles.page}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Reports</Text>
      </View>

      <Text style={styles.sectionTitle}>VI. Stage : Done</Text>

      <Text style={styles.sectionTitle}>VII. Subtasks</Text>
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Task Title</Text>
          <Text style={styles.tableHeader}>Subtask Title</Text>
          <Text style={styles.tableHeader}>Members</Text>
          <Text style={styles.tableHeader}>Attachments</Text>
          <Text style={styles.tableHeader}>Comments</Text>
          <Text style={styles.tableHeader}>Start Date</Text>
          <Text style={styles.tableHeader}>End Date</Text>
        </View>
        {[
          {
            taskTitle: "Website Redesign",
            subtaskTitle: "Landing Page Revamp",
            members: "Alice, Bob",
            attachments: "3",
            comments: "5",
            startDate: "2025-06-01",
            endDate: "2025-06-15",
          },
          {
            taskTitle: "Backend API Update",
            subtaskTitle: "Auth Service",
            members: "Charlie",
            attachments: "1",
            comments: "2",
            startDate: "2025-06-05",
            endDate: "2025-06-20",
          },
          {
            taskTitle: "Marketing Campaign",
            subtaskTitle: "Social Media Ads",
            members: "David, Emma",
            attachments: "4",
            comments: "8",
            startDate: "2025-06-10",
            endDate: "2025-06-25",
          },
          {
            taskTitle: "Data Migration",
            subtaskTitle: "Legacy Database Cleanup",
            members: "Fiona",
            attachments: "2",
            comments: "3",
            startDate: "2025-06-15",
            endDate: "2025-06-30",
          },
          {
            taskTitle: "Product Launch",
            subtaskTitle: "Press Release Draft",
            members: "George, Hannah",
            attachments: "5",
            comments: "6",
            startDate: "2025-06-20",
            endDate: "2025-07-05",
          },
        ].map((row, i) => (
          <View key={i} style={styles.tableRow}>
            <Text style={styles.tableCell}>{row.taskTitle}</Text>
            <Text style={styles.tableCell}>{row.subtaskTitle}</Text>
            <Text style={styles.tableCell}>{row.members}</Text>
            <Text style={styles.tableCell}>{row.attachments}</Text>
            <Text style={styles.tableCell}>{row.comments}</Text>
            <Text style={styles.tableCell}>{row.startDate}</Text>
            <Text style={styles.tableCell}>{row.endDate}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Task Title</Text>
          <Text style={styles.tableHeader}>Lead by</Text>
          <Text style={styles.tableHeader}>Subtask Count</Text>
        </View>
        {[
          { title: "Deployment", lead: "David", count: "1" },
          { title: "Deployment", lead: "David", count: "2" },
        ].map((row, i) => (
          <View style={styles.tableRow} key={i}>
            <Text style={styles.tableCell}>{row.title}</Text>
            <Text style={styles.tableCell}>{row.lead}</Text>
            <Text style={[styles.tableCell, styles.lastCell]}>{row.count}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.pageFooter}>page 3</Text>
    </Page>

    {/* PAGE 4 */}
    <Page size="A4" style={styles.page}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Reports</Text>
      </View>

      <Text style={styles.sectionTitle}>VIII. Monthly Task Information</Text>
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Month</Text>
          <Text style={styles.tableHeader}>Task</Text>
          <Text style={styles.tableHeader}>Subtask</Text>
          <Text style={styles.tableHeader}>Completed</Text>
          <Text style={styles.tableHeader}>Version</Text>
        </View>
        {[
          {
            month: "January",
            task: "4",
            subtask: "3",
            completed: "70%",
            version: "V1",
          },
          {
            month: "February",
            task: "5",
            subtask: "4",
            completed: "80%",
            version: "V1",
          },
          {
            month: "March",
            task: "6",
            subtask: "5",
            completed: "90%",
            version: "V1",
          },
          {
            month: "April",
            task: "7",
            subtask: "6",
            completed: "100%",
            version: "V1",
          },
          {
            month: "Total",
            task: "22",
            subtask: "18",
            completed: "85%",
            version: "V1",
          },
        ].map((row, i) => (
          <View style={styles.tableRow} key={i}>
            <Text style={styles.tableCell}>{row.month}</Text>
            <Text style={styles.tableCell}>{row.task}</Text>
            <Text style={styles.tableCell}>{row.subtask}</Text>
            <Text style={styles.tableCell}>{row.completed}</Text>
            <Text style={styles.tableCell}>{row.version}</Text>
            {/* <Text style={[styles.tableCell, styles.lastCell]}>{row.count}</Text> */}
          </View>
        ))}
      </View>

      <Text style={styles.pageFooter}>page 4</Text>
    </Page>
  </Document>
);

export default MyDocument;
