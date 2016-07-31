    ____   ____   ___    ___    ____   ____ 
    |      |  |   |__]   |__]   |___   |__/ 
    |___   |__|   |      |      |___   |  \ 
    -----------------------------------------
    
Copper is a game engine that uses content packs to add all of the games content. these content packs are seperate from the 
source code and are imported via URL. here is a basic drawing of the order of content packs, game source, textures, and content pack code:
              +-------------+
              | game        |
              +------+------+
                     |
                     |
                     |
                     |
          +----------+-----------+
          |                      |
          |                      |
          |                      |
    +-----+-----+          +-----+-----+
    |default src|          |content    |
    +-----+-----+          +----+------+
          |                     |
          |                     |
          |                     |
          |                     |
          |                     |
          |                     |
    +-----+----+                |
    |  register|                |
    |  content |        +-------+-----------+      +-------------------+
    |  and add |        |     content added |      | render and finish |
    |  hooks   |        |                   |      | loading game. show|
    |  for other -------+y                  |      | start screen and  |
    |  content |        |                   |      | allow for player  |
    +----+-----+        |                   |      | to join a online  |
         |              +--------n----------+      | room.             |
         |                       +                 |                   |
         |                       |                 |                   |
         +-----------------------+-----------------+-------------------+
