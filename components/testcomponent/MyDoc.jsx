import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Styles mimicking Tailwind
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica", // system font
    padding: 40,
    backgroundColor: "#F9FAFB", // tailwind's gray-50
    color: "#1F2937", // tailwind's gray-800
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#111827", // gray-900
  },
  section: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    border: "1pt solid #E5E7EB", // gray-200
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    color: "#2563EB", // blue-600
    fontWeight: "bold",
  },
  bodyText: {
    fontSize: 12,
    lineHeight: 1.6,
    color: "#374151", // gray-700
  },
  bold: {
    fontWeight: "bold",
  },
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>React PDF Preview</Text>

      <View style={styles.section}>
        <Text style={styles.title}> Welcome!</Text>
        <Text style={styles.bodyText}>
          This PDF was generated using{" "}
          <Text style={styles.bold}>@react-pdf/renderer</Text>. It supports
          custom styles, fonts, and components.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}> Purpose</Text>
        <Text style={styles.bodyText}>
          Use this component to create invoices, reports, resumes, or any kind
          of printable doc inside your React app.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>What's next?</Text>
        <Text style={styles.bodyText}>
          Add dynamic content, fetch user data, loop through arrays, and render
          anything — just like normal React, but rendered to PDF.
        </Text>
      </View>
    </Page>

    {/* Page 2 */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>React PDF Preview - Page 3</Text>

      <View style={styles.section}>
        <Text style={styles.title}>Advanced Features</Text>
        <Text style={styles.bodyText}>
          Explore advanced features like embedding images, adding tables, or
          integrating charts. You can also customize page layouts with headers,
          footers, or watermarks.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Get Started</Text>
        <Text style={styles.bodyText}>
          Visit the <Text style={styles.bold}>@react-pdf/renderer</Text>{" "}
          documentation for more examples and advanced use cases to enhance your
          PDF generation.
        </Text>
      </View>
    </Page>

    {/* Page 3 */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>React PDF Preview - Page 3</Text>

      <View style={styles.section}>
        <Text style={styles.title}>Advanced Features</Text>
        <Text style={styles.bodyText}>
          Explore advanced features like embedding images, adding tables, or
          integrating charts. You can also customize page layouts with headers,
          footers, or watermarks.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Get Started</Text>
        <Text style={styles.bodyText}>
          Visit the <Text style={styles.bold}>@react-pdf/renderer</Text>{" "}
          documentation for more examples and advanced use cases to enhance your
          PDF generation.
        </Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
