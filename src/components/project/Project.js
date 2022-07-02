import { Card, CardMedia } from "@mui/material";

const Project = () => {
  return (
    <Card>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="project's image"
      />
    </Card>
  );
};

export default Project;
