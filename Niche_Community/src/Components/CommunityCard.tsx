import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@material-ui/core';

interface CommunityCardProps {
  title: string;
  description: string;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ title, description }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Join Community
        </Button>
      </CardActions>
    </Card>
  );
};

export default CommunityCard;
