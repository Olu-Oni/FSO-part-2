const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    );
  };
  
  const Header = ({ course }) => <h1>{course.name}</h1>;
  
  const Content = ({ course }) => {
    const parts = course.parts;
    return (
      <div>
        {parts.map((arr) => (
          <Part key={arr.id} part={arr.name} exercise={arr.exercises} />
        ))}
      </div>
    );
  };
  
  const Part = ({ part, exercise }) => (
    <p>
      {part} {exercise}
    </p>
  );
  
  const Total = ({ course }) => {
    const parts = course.parts;
    return (
      <p>
        Number of exercises {parts.reduce((sum, arr) => sum + arr.exercises, 0)}
      </p>
    );
  };

  export default Course