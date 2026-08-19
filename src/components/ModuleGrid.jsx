import { Box } from '@mui/material';

import { moduleRegistry } from '../modules/moduleRegistry';

function ModuleGrid({
  modules,
  onRemoveModule,
}) {
  return (
    <Box
      sx={{
        minWidth: 0,
        minHeight: 0,
        overflow: 'auto',
        p: 2,

        display: 'grid',
        gridTemplateColumns:
          'repeat(auto-fill, minmax(280px, 1fr))',
        gridAutoRows: 'max-content',
        gap: 2,

        alignContent: 'start',
        bgcolor: 'grey.100',
      }}
    >
      {modules.map((module) => {
        const definition =
          moduleRegistry[module.type];

        if (!definition) {
          return null;
        }

        const ModuleComponent =
          definition.component;

        return (
          <ModuleComponent
            key={module.id}
            moduleId={module.id}
            onRemove={() =>
              onRemoveModule(module.id)
            }
          />
        );
      })}
    </Box>
  );
}

export default ModuleGrid;