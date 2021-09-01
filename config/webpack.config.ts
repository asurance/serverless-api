import { basename, join, resolve } from 'path'
import { Configuration, EntryObject } from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { readdirSync, statSync } from 'fs'

const indexPath = resolve(__dirname, '../src/index.ts')
const apiPath = resolve(__dirname, '../src/api')

function DeepSet(entry: EntryObject, root: string, cur: string) {
  const curPath = resolve(root, cur)
  const files = readdirSync(curPath)
  for (const file of files) {
    const filePath = resolve(curPath, file)
    const stat = statSync(filePath)
    if (stat.isDirectory()) {
      DeepSet(entry, root, join(cur, file))
    } else {
      entry[join(cur, basename(file, '.ts'))] = resolve(curPath, file)
    }
  }
}

export default function (env: Record<string, unknown>): Configuration {
  const buildApi = (env.BUILD_API as string) || ('index' as string)
  console.log('current build api', buildApi)
  const entry: EntryObject = {}
  if (buildApi === 'index') {
    entry.index = indexPath
  } else if (buildApi === 'all') {
    DeepSet(entry, apiPath, './')
  } else {
    DeepSet(entry, apiPath, buildApi)
  }
  const config = {
    target: 'node',
    mode: 'production',
    entry,
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                compilerOptions: {
                  module: 'es6',
                },
                transpileOnly: true,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    plugins: [new CleanWebpackPlugin()],
    output: {
      filename: '[name].js',
      path: resolve(__dirname, '../dist'),
    },
  } as Configuration
  return config
}
