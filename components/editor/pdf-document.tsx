import { Document, Page, View, Text, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getFullName(firstName?: string, lastName?: string): string {
  return [firstName, lastName].filter(Boolean).join(' ') || 'Your Name';
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  if (dateStr === 'Present') return 'Present';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

interface PDFDocumentProps {
  data: ResumeData;
}

export function ResumePDFDocument({ data }: PDFDocumentProps) {
  const pi = data.personalInfo;
  const name = getFullName(pi.firstName, pi.lastName);
  const template = data.customization.template || 'classic';
  const accentColor = data.customization.accentColor || '#4F46E5';

  // ─── Stylesheet configuration based on templates ──────────────────────────
  const isMinimal = template === 'minimal';
  const isModern = template === 'modern';

  const styles = StyleSheet.create({
    page: {
      padding: isModern ? 0 : 36,
      fontFamily: isMinimal ? 'Times-Roman' : 'Helvetica',
      fontSize: 10,
      color: '#222222',
      backgroundColor: '#ffffff',
      lineHeight: 1.4,
    },
    // Modern Header Block
    modernHeader: {
      backgroundColor: accentColor,
      color: '#ffffff',
      padding: '30 36 20',
      marginBottom: 20,
    },
    modernTitle: {
      fontSize: 26,
      fontWeight: 'bold',
      fontFamily: 'Helvetica-Bold',
      marginBottom: 4,
    },
    modernSubtitle: {
      fontSize: 13,
      opacity: 0.9,
      marginBottom: 10,
    },
    modernContactRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      fontSize: 9,
      opacity: 0.85,
    },
    // Classic/Minimal Header
    classicHeader: {
      borderBottomWidth: isMinimal ? 1 : 2,
      borderBottomColor: isMinimal ? '#dddddd' : accentColor,
      paddingBottom: 12,
      marginBottom: 16,
      textAlign: isMinimal ? 'center' : 'left',
    },
    classicTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      fontFamily: isMinimal ? 'Times-Bold' : 'Helvetica-Bold',
      color: '#111111',
      letterSpacing: isMinimal ? 2 : 0,
      textTransform: isMinimal ? 'uppercase' : 'none',
      marginBottom: 4,
    },
    classicSubtitle: {
      fontSize: 12,
      color: isMinimal ? '#666666' : accentColor,
      fontWeight: isMinimal ? 'normal' : 'bold',
      fontFamily: isMinimal ? 'Times-Roman' : 'Helvetica-Bold',
      marginBottom: 8,
    },
    classicContactRow: {
      flexDirection: 'row',
      justifyContent: isMinimal ? 'center' : 'flex-start',
      flexWrap: 'wrap',
      gap: 10,
      fontSize: 9,
      color: '#555555',
    },
    contactItem: {
      color: isMinimal ? '#555555' : isModern ? '#ffffff' : '#555555',
      textDecoration: 'none',
    },
    // Modern Container Wrap
    modernContentContainer: {
      paddingHorizontal: 36,
      paddingBottom: 36,
    },
    // Section Header Style
    sectionContainer: {
      marginBottom: 16,
    },
    sectionTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      borderBottomWidth: isMinimal ? 0.5 : 0,
      borderBottomColor: '#cccccc',
      paddingBottom: isMinimal ? 3 : 0,
    },
    sectionTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      fontFamily: isMinimal ? 'Times-Bold' : 'Helvetica-Bold',
      textTransform: 'uppercase',
      letterSpacing: 1,
      color: isMinimal ? '#222222' : accentColor,
    },
    sectionTitleLine: {
      flex: 1,
      height: 1,
      backgroundColor: isModern ? `${accentColor}33` : `${accentColor}15`,
      marginLeft: 10,
    },
    // Experience / Education Item
    entryContainer: {
      marginBottom: 10,
      paddingLeft: isModern ? 8 : 0,
      borderLeftWidth: isModern ? 2 : 0,
      borderLeftColor: isModern ? `${accentColor}33` : 'transparent',
    },
    entryHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 2,
    },
    entryTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      fontFamily: isMinimal ? 'Times-Bold' : 'Helvetica-Bold',
      color: '#111111',
    },
    entryDate: {
      fontSize: 9,
      color: '#777777',
      fontStyle: 'italic',
      fontFamily: isMinimal ? 'Times-Italic' : 'Helvetica-Oblique',
    },
    entrySubtitle: {
      fontSize: 10,
      color: accentColor,
      fontWeight: 'bold',
      fontFamily: isMinimal ? 'Times-Italic' : 'Helvetica-Bold',
      marginBottom: 4,
    },
    entryDescription: {
      fontSize: 9.5,
      color: '#444444',
      lineHeight: 1.4,
    },
    bulletPoint: {
      flexDirection: 'row',
      marginBottom: 2,
      paddingLeft: 4,
    },
    bullet: {
      width: 8,
      fontSize: 9.5,
      color: '#444444',
    },
    bulletText: {
      flex: 1,
      fontSize: 9.5,
      color: '#444444',
    },
    // Skills wrapper
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    skillTag: {
      fontSize: 9,
      color: accentColor,
      backgroundColor: isModern ? `${accentColor}10` : 'transparent',
      borderWidth: isModern ? 1 : 0,
      borderColor: isModern ? `${accentColor}25` : 'transparent',
      paddingHorizontal: isModern ? 8 : 0,
      paddingVertical: isModern ? 3 : 0,
      borderRadius: isModern ? 4 : 0,
    },
    skillClassicRow: {
      width: '100%',
      flexDirection: 'row',
      marginBottom: 4,
    },
    skillClassicCategory: {
      width: 100,
      fontWeight: 'bold',
      fontFamily: isMinimal ? 'Times-Bold' : 'Helvetica-Bold',
      color: '#111111',
    },
    skillClassicList: {
      flex: 1,
      color: '#444444',
    },
  });

  // Render contact line items
  const renderContactInfo = () => {
    const items = [];
    if (pi.email) items.push(<Text key="email" style={styles.contactItem}>{pi.email}</Text>);
    if (pi.phone) items.push(<Text key="phone" style={styles.contactItem}>{pi.phone}</Text>);
    if (pi.location) items.push(<Text key="location" style={styles.contactItem}>{pi.location}</Text>);
    if (pi.linkedin) items.push(<Text key="linkedin" style={styles.contactItem}>{pi.linkedin}</Text>);
    if (pi.github) items.push(<Text key="github" style={styles.contactItem}>{pi.github}</Text>);
    if (pi.website) items.push(<Text key="website" style={styles.contactItem}>{pi.website}</Text>);
    return items.reduce((acc: React.ReactNode[], elem, idx) => {
      if (idx === 0) return [elem];
      return [...acc, <Text key={`sep-${idx}`} style={{ opacity: 0.5 }}>|</Text>, elem];
    }, []);
  };

  const renderSectionHeader = (title: string) => (
    <View style={styles.sectionTitleContainer} fixed={false}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {!isMinimal && <View style={styles.sectionTitleLine} />}
    </View>
  );

  return (
    <Document title={`${name} - Resume`}>
      <Page size="A4" style={styles.page}>
        {/* ─── Header ────────────────────────────────────────── */}
        {isModern ? (
          <View style={styles.modernHeader}>
            <Text style={styles.modernTitle}>{name}</Text>
            {pi.jobTitle ? <Text style={styles.modernSubtitle}>{pi.jobTitle}</Text> : null}
            <View style={styles.modernContactRow}>{renderContactInfo()}</View>
          </View>
        ) : (
          <View style={styles.classicHeader}>
            <Text style={styles.classicTitle}>{name}</Text>
            {pi.jobTitle ? <Text style={styles.classicSubtitle}>{pi.jobTitle}</Text> : null}
            <View style={styles.classicContactRow}>{renderContactInfo()}</View>
          </View>
        )}

        {/* ─── Wrapper for Modern (margins) ──────────────────── */}
        <View style={isModern ? styles.modernContentContainer : {}}>
          {/* Summary */}
          {data.summary ? (
            <View style={styles.sectionContainer} fixed={false}>
              {renderSectionHeader('Professional Summary')}
              <Text style={styles.entryDescription}>{data.summary}</Text>
            </View>
          ) : null}

          {/* Work Experience */}
          {data.experience.length > 0 ? (
            <View style={styles.sectionContainer} fixed={false}>
              {renderSectionHeader('Experience')}
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.entryContainer} wrap={false}>
                  <View style={styles.entryHeader}>
                    <Text style={styles.entryTitle}>{exp.position}</Text>
                    <Text style={styles.entryDate}>
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </Text>
                  </View>
                  <Text style={styles.entrySubtitle}>
                    {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                  </Text>
                  {exp.description ? (
                    <View style={{ marginTop: 2 }}>
                      {exp.description.split('\n').filter(Boolean).map((line, idx) => {
                        const cleanLine = line.replace(/^[•\-*]\s*/, '');
                        return (
                          <View key={idx} style={styles.bulletPoint}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.bulletText}>{cleanLine}</Text>
                          </View>
                        );
                      })}
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          ) : null}

          {/* Education */}
          {data.education.length > 0 ? (
            <View style={styles.sectionContainer} fixed={false}>
              {renderSectionHeader('Education')}
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.entryContainer} wrap={false}>
                  <View style={styles.entryHeader}>
                    <Text style={styles.entryTitle}>{edu.institution}</Text>
                    <Text style={styles.entryDate}>
                      {formatDate(edu.startDate)} – {edu.current ? 'Present' : formatDate(edu.endDate)}
                    </Text>
                  </View>
                  <Text style={styles.entrySubtitle}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                    {edu.gpa ? ` (GPA: ${edu.gpa})` : ''}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}

          {/* Skills */}
          {data.skills.length > 0 ? (
            <View style={styles.sectionContainer} fixed={false}>
              {renderSectionHeader('Skills')}
              {isModern ? (
                <View style={styles.skillsContainer}>
                  {data.skills.flatMap((cat) =>
                    cat.skills.map((skill, idx) => (
                      <Text key={`${cat.id}-${idx}`} style={styles.skillTag}>
                        {skill}
                      </Text>
                    ))
                  )}
                </View>
              ) : (
                <View style={{ gap: 4 }}>
                  {data.skills.map((cat) => cat.skills.length > 0 ? (
                    <View key={cat.id} style={styles.skillClassicRow}>
                      {cat.name ? <Text style={styles.skillClassicCategory}>{cat.name}:</Text> : null}
                      <Text style={styles.skillClassicList}>{cat.skills.join(' · ')}</Text>
                    </View>
                  ) : null)}
                </View>
              )}
            </View>
          ) : null}

          {/* Projects */}
          {data.projects.length > 0 ? (
            <View style={styles.sectionContainer} fixed={false}>
              {renderSectionHeader('Projects')}
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.entryContainer} wrap={false}>
                  <View style={styles.entryHeader}>
                    <Text style={styles.entryTitle}>{proj.name}</Text>
                    {proj.technologies.length > 0 ? (
                      <Text style={styles.entryDate}>
                        ({proj.technologies.slice(0, 4).join(', ')})
                      </Text>
                    ) : null}
                  </View>
                  {proj.description ? (
                    <Text style={styles.entryDescription}>{proj.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );
}
