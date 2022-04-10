import React from "react";
import { Button, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";
import { Heart, HeartFill} from "react-bootstrap-icons";

const PokeCard = ({ name, image, fav, favClick, favorites }) => {
  return (
    <Card bg="dark" text="light" key={name}>
      <Card.Header className="d-flex justifiy-content-between">{name}
      {
        fav ? (
          <HeartFill onClick={favClick} favorites={favorites} size="30" color="red" />
        ) : (
          <Heart onClick={favClick} favorites={favorites} size="30" color="white" />
        )
      }
      </Card.Header>
      <Card.Body>
        <Card.Img variant="top" src={image} />
        <LinkContainer to={`/${name}`}>
        <Button variant="outline-secondary" size="sm">
          Details
        </Button> 
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default PokeCard;
