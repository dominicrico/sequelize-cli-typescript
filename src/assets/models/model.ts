
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes
} from 'sequelize'
import sequelize from '@bunch/lib/db'

<%
  function getType(dataType) {
    dataType = dataType.toLowerCase();

    if ( ['tinyint', 'smallint', 'mediumint', 'integer', 'bigint', 'float', 'double', 'decimal', 'real'].indexOf(dataType) !== -1 ) {
      return 'number;';
    }

    if ( ['char', 'string', 'text', 'blob'].indexOf(dataType) !== -1 ) {
      return 'string;';
    }

    if ( ['date'].indexOf(dataType) !== -1 ) {
      return 'Date;';
    }

    if ( ['dateonly', 'time', 'now', 'json', 'jsonb'].indexOf(dataType) !== -1 ) {
      return 'string;  // actually a ' + dataType + ' column';
    }

    if ( ['enum'].indexOf(dataType) !== -1 ) {
      return "string;  // replace with 'validValue1' | 'validValue2', ...";
    }

    if ( ['boolean'].indexOf(dataType) !== -1 ) {
      return 'boolean;';
    }

    if ( ['uuid', 'uuidv1', 'uuidv4'].indexOf(dataType) !== -1 ) {
      return 'string;';
    }

    return dataType;
  }
%>

class <%= name[0].toUpperCase() + name.substr(1) %> extends Model<InferAttributes<<%= name[0].toUpperCase() + name.substr(1) %>>, InferCreationAttributes<<%= name[0].toUpperCase() + name.substr(1) %>>> {
  declare id: CreationOptional<number>
  <% attributes.forEach(function(attribute) {
  %>declare <%= attribute.fieldName %>: <%= getType(attribute.dataType) %>
  <%
  }) %>

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>
}

<%= name[0].toUpperCase() + name.substr(1) %>.init(
  {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED
    },

    <% attributes.forEach(function(attribute, index) { %><%= attribute.fieldName %>: DataTypes.<%= attribute.dataFunction ? `${attribute.dataFunction.toUpperCase()}(DataTypes.${attribute.dataType.toUpperCase()})` : attribute.dataType.toUpperCase() %>,<% }) %>

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  },
  {
    paranoid: true,
    timestamps: true,
    sequelize,
    modelName: '<%= name[0].toUpperCase() + name.substr(1) %>'
  }
)

export default <%= name[0].toUpperCase() + name.substr(1) %>
