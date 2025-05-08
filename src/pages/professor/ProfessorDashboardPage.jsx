import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfessorStats } from '../../api/professorApi';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

/**
 * @component ProfessorDashboardPage
 * @description Dashboard for professors showing course statistics, enrollment data,
 * completion rates, and top-performing courses.
 * @returns {JSX.Element} The professor dashboard page with charts and statistics
 */
const ProfessorDashboardPage = () => {

    const queryClient = useQueryClient();


    const { data: stats, isLoading, error } = useQuery({
        queryKey: ['professorStats'],
        queryFn: getProfessorStats,
        staleTime: 300000,
        refetchOnWindowFocus: false,
      });
      

  // Prepare data for the enrollment bar chart
  const prepareEnrollmentChartData = () => {
    if (!stats) return null;

    const courseIds = Object.keys(stats.enrollmentsPerCourse);
    const labels = courseIds.map(id => stats.courseNames[id]);
    const data = courseIds.map(id => stats.enrollmentsPerCourse[id]);

    return {
      labels,
      datasets: [
        {
          label: 'Student Enrollments',
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  // Prepare data for the completion status donut chart
  const prepareCompletionStatusChartData = () => {
    if (!stats) return null;

    return {
      labels: ['Completed', 'In Progress', 'Not Started'],
      datasets: [
        {
          data: [
            stats.statusBreakdown.completed,
            stats.statusBreakdown.inProgress,
            stats.statusBreakdown.notStarted,
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(255, 99, 132, 0.6)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  // Prepare top courses by revenue
  const prepareTopCoursesByRevenue = () => {
    if (!stats) return [];

    const courseIds = Object.keys(stats.enrollmentsPerCourse);
    const coursesWithRevenue = courseIds.map(id => ({
      id,
      name: stats.courseNames[id],
      enrollments: stats.enrollmentsPerCourse[id],
      price: stats.coursePrices[id],
      revenue: stats.enrollmentsPerCourse[id] * stats.coursePrices[id],
      completionRate: stats.completionRates[id]
    }));

    // Sort by revenue (highest first) and take top 5
    return coursesWithRevenue
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
        <LoadingText>Loading dashboard data...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorIcon>⚠️</ErrorIcon>
        <ErrorTitle>Error Loading Dashboard</ErrorTitle>
        <ErrorMessage>{error.message || 'Failed to load dashboard data. Please try again later.'}</ErrorMessage>
        <RetryButton onClick={() => queryClient.invalidateQueries('professorStats')}>
          Retry
        </RetryButton>
      </ErrorContainer>
    );
  }

  const enrollmentChartData = prepareEnrollmentChartData();
  const completionStatusChartData = prepareCompletionStatusChartData();
  const topCoursesByRevenue = prepareTopCoursesByRevenue();

  return (
    <DashboardContainer>
      <Header>
        <Title>Professor Dashboard</Title>
        <NavLinks>
          <StyledLink to="/professor/courses">Manage Courses</StyledLink>
          <StyledLink to="/professor/dashboard">Dashboard</StyledLink>
        </NavLinks>
      </Header>

      <StatsSummary>
        <StatCard>
          <StatValue>{stats.totalCourses}</StatValue>
          <StatLabel>Total Courses</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.totalStudents}</StatValue>
          <StatLabel>Total Students</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>
            {Math.round(
              (stats.statusBreakdown.completed / stats.totalStudents) * 100
            )}%
          </StatValue>
          <StatLabel>Completion Rate</StatLabel>
        </StatCard>
      </StatsSummary>

      <ChartsContainer>
        <ChartCard>
          <ChartTitle>Course Enrollments</ChartTitle>
          <ChartWrapper>
            <Bar 
              data={enrollmentChartData} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Students Enrolled Per Course'
                  }
                }
              }} 
            />
          </ChartWrapper>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Completion Status</ChartTitle>
          <ChartWrapper>
            <Doughnut 
              data={completionStatusChartData} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Student Progress Status'
                  }
                }
              }} 
            />
          </ChartWrapper>
        </ChartCard>
      </ChartsContainer>

      <TableSection>
        <TableTitle>Top 5 Courses by Revenue</TableTitle>
        <StyledTable>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Enrollments</th>
              <th>Price</th>
              <th>Revenue</th>
              <th>Completion Rate</th>
            </tr>
          </thead>
          <tbody>
            {topCoursesByRevenue.map(course => (
              <tr key={course.id}>
                <td>{course.name}</td>
                <td>{course.enrollments}</td>
                <td>${course.price.toFixed(2)}</td>
                <td>${course.revenue.toFixed(2)}</td>
                <td>{course.completionRate}%</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableSection>
    </DashboardContainer>
  );
};

// Styled Components
const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

/*const Title = styled.h1`
  margin: 0;
  color: #333;
`;*/

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: #4a90e2;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3a7bc8;
  }
`;

const StatsSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #4a90e2;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #666;
`;

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ChartTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
`;

const ChartWrapper = styled.div`
  height: 300px;
`;

const TableSection = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const TableTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  color: #333;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    background-color: #f5f5f5;
    font-weight: 600;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  tr:hover td {
    background-color: #f9f9f9;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorContainer = styled.div`
  padding: 2rem;
  background-color: #ffebee;
  border-radius: 8px;
  color: #c62828;
  margin: 2rem auto;
  max-width: 800px;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #4a90e2;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: #666;
  font-size: 1.2rem;
  margin: 0;
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h3`
  color: #c62828;
  margin: 0 0 1rem;
`;

const ErrorMessage = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`;

const RetryButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3a7bc8;
  }
`;

export default ProfessorDashboardPage;