# Consumer Agent

## Project status

- The project is under development: 🛠 by [sfl0r3nz05](sfigueroa@ceit.es)

## Architecture

- The publisher agent must be ready for use in any environment. E.g.:

- Fiware-based environment:
    
    ![Architecture2](https://user-images.githubusercontent.com/6643905/219717124-d5d2db80-e31b-42a9-854b-261e1c25ac43.png)

- RabbitMQ-based environment:
    
    <img width="400" alt="ConsumerAgent" src="https://user-images.githubusercontent.com/6643905/234698911-7b352e30-3c0b-48f2-97ca-4bf5f82da89e.PNG">

## Requirements

- In order to establish a connection with the rest of the components, they will have to be in the same docker network as the publisher. The requirements are to have docker installed and a network called `syntheticnet` created on it, to install docker you can follow [this](https://docs.docker.com/engine/install/) guide, and to create a docker network run the following command:

  ```bash
  docker network create syntheticnet
  ```

- In case of using the agent to connect to an already existing network, it will be enough to modify the docker-compose file. E.g.:

  ```console
  networks:
    default:
        external:
           name: syntheticnet
  ```

## To Do
- Add trivy vulnerability scanner to github workflow
- Improve project documentation
- Manage any kind of data
- Support other the messaging technologies like Kafka or HTTP
- Implement a solution to handle several topics simultaneously