// Mock function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get professor statistics
export const getProfessorStats = async () => {
  try {
    // Simulate API call
    await delay(1000);
    console.log('Fetching professor statistics');
    
    // In a real implementation, you would make an API call here
    // Example: return await axios.get('/api/professor/stats');
    
    // For now, just return mock data
    return {
      totalCourses: 5,
      totalStudents: 342,
      
      // Enrollments per course (courseId: number of enrollments)
      enrollmentsPerCourse: {
        '1': 125,
        '2': 87,
        '3': 63,
        '4': 42,
        '5': 25
      },
      
      // Course names for reference
      courseNames: {
        '1': 'Introduction to React',
        '2': 'Advanced JavaScript Patterns',
        '3': 'Full Stack Development with MERN',
        '4': 'Node.js Backend Development',
        '5': 'UI/UX Design Principles'
      },
      
      // Course prices for revenue calculation
      coursePrices: {
        '1': 49.99,
        '2': 79.99,
        '3': 99.99,
        '4': 69.99,
        '5': 59.99
      },
      
      // Completion rates per course (courseId: percentage completed)
      completionRates: {
        '1': 78,
        '2': 65,
        '3': 42,
        '4': 31,
        '5': 18
      },
      
      // Overall status breakdown
      statusBreakdown: {
        completed: 112,
        inProgress: 187,
        notStarted: 43
      }
    };
  } catch (error) {
    console.error('Error fetching professor statistics:', error);
    throw error;
  }
};