import { Stack } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { useTheme } from "react-native-paper";



export default function AboutUs() {
  const theme = useTheme();
  const markdownContent = `
## Welcome to TLAS

At **TLAS (Technology Logistic and Advance Software)**, we are dedicated to revolutionizing the way businesses operate through innovative technology solutions. Our mission is to provide cutting-edge software and logistics services that empower our clients to achieve their goals efficiently and effectively.

## Our Story

Founded in 2024, TLAS was born out of a passion for technology and a commitment to excellence. Our journey began with a small team of dedicated professionals who shared a vision of transforming the logistics industry through advanced software solutions. Over the years, we have grown into a leading provider of technology and logistics services, serving clients across various industries.

## Our Mission

Our mission is to deliver innovative, reliable, and scalable technology solutions that drive business growth and optimize operations. We strive to be a trusted partner for our clients, providing them with the tools and expertise they need to succeed in a rapidly evolving market.

## Our Values

- **Innovation**: We are constantly pushing the boundaries of what's possible, exploring new technologies and methodologies to stay ahead of the curve.
- **Excellence**: We are committed to delivering the highest quality products and services, exceeding our clients' expectations every step of the way.
- **Integrity**: We conduct our business with honesty and transparency, building strong, lasting relationships with our clients and partners.
- **Collaboration**: We believe in the power of teamwork and foster a collaborative environment where ideas are shared and valued.

## Our Services

### Technology Solutions

- **Custom Software Development**: We create tailored software solutions that meet the unique needs of our clients.
- **Cloud Services**: We offer secure and scalable cloud solutions to enhance your business operations.
- **Data Analytics**: We provide advanced data analytics services to help you make informed decisions.

### Logistics Services

- **Supply Chain Management**: We optimize your supply chain to ensure efficient and cost-effective operations.
- **Warehouse Management**: We offer comprehensive warehouse management solutions to streamline your inventory processes.
- **Transportation Management**: We provide innovative transportation management systems to improve your logistics operations.

## Our Team

Our team is comprised of highly skilled professionals with expertise in software development, logistics, data analytics, and more. We are united by a shared passion for innovation and a commitment to delivering exceptional results for our clients.

## Contact Us

We would love to hear from you! Whether you have a question about our services, want to discuss a project, or just want to say hello, please don't hesitate to reach out.

- **Email**: [support@tlas.online](mailto:support@tlas.online)
- **Address**:El Milagro URU, Maracaibo, 4001, Venezuela

Thank you for choosing TLAS. We look forward to helping you achieve your business goals!

Profe lo queremos mucho.

`;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 10,
      backgroundColor: theme.colors.surface, // Fondo negro para contraste
    },
    scrollView: {
      flexGrow: 1,
    },
    markdown: {
      body: {
        color: theme.colors.shadow, 
      },
      heading1: {
        color: theme.colors.shadow, 
      },
    
    },
  });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `About Us `,
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.primaryContainer, // Cambia este valor al color que desees
          },
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Markdown style={styles.markdown}>{markdownContent}</Markdown>
      </ScrollView>
    </View>
  );
}

